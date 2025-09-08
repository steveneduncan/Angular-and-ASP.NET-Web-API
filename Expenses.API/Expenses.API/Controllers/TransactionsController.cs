using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.DTOs;
using Expenses.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionsController(ITransactionsService transactionService) : ControllerBase
    {
        [HttpGet("All")]
        public IActionResult GetAll()
        {
            var NameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(NameIdentifierClaim))
                return BadRequest("Could not get the user id");

            if (!int.TryParse(NameIdentifierClaim, out int userId))
                return BadRequest("User id is not valid");

            var allTransactions = transactionService.GetAllTransactions(userId);
            return Ok(allTransactions);
        }

        [HttpGet("Details/{id}")]
        public IActionResult Get(int id)
        {
            var transaction = transactionService.GetTransactionById(id);
            if (transaction == null)
                return NotFound();

            return Ok(transaction);
        }

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto payload)
        {
            var NameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(NameIdentifierClaim))
                return BadRequest("Could not get the user id");

            if(!int.TryParse(NameIdentifierClaim, out int userId))
                return BadRequest("User id is not valid"); 
            
            var transaction = transactionService.AddTransaction(payload, userId);
            return Ok(transaction);
        }

        [HttpPut("Update/{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody]PutTransactionDto payload)
        {
            var transaction = transactionService.UpdateTransaction(id, payload);
            if (transaction == null)
                return NotFound();

            return Ok(transaction);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            transactionService.DeleteTransaction(id);
            return Ok();
        }

    }
}
