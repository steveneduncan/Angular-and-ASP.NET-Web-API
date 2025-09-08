using Expenses.API.DTOs;
using Expenses.API.Models;

namespace Expenses.API.Data.Services
{
    public interface ITransactionsService
    {
        List<Transaction> GetAllTransactions(int userId);
        Transaction? GetTransactionById(int id);
        Transaction AddTransaction(PostTransactionDto payload, int userId);
        Transaction? UpdateTransaction(int id, PutTransactionDto payload);
        void DeleteTransaction(int id);
    }
    public class TransactionsServices(AppDbContext context) : ITransactionsService
    {
        public Transaction AddTransaction(PostTransactionDto transaction, int userId)
        {
            var newTransaction = new Transaction
            {
                Amount = transaction.Amount,
                Type = transaction.Type,
                Category = transaction.Category,
                CreatedAt = transaction.CreatedAt,
                UpdatedAt = transaction.UpdatedAt,
                UserId = userId
            };

            context.Transactions.Add(newTransaction);
            context.SaveChanges();
            return newTransaction;
        }

        public void DeleteTransaction(int id)
        {
            var existingTransaction = context.Transactions.FirstOrDefault(n => n.Id == id);
            if (existingTransaction != null)
            {
                context.Transactions.Remove(existingTransaction);
                context.SaveChanges();
            }
        }

        public List<Transaction> GetAllTransactions(int userId)
        {
            var allTransactions = context.Transactions.Where(n=>n.UserId == userId).ToList();
            return allTransactions;
        }

        public Transaction? GetTransactionById(int id)
        {
            var transaction = context.Transactions.FirstOrDefault(n => n.Id == id);
            return transaction;
        }

        public Transaction? UpdateTransaction(int id, PutTransactionDto transaction)
        {
            var transactionDb = context.Transactions.FirstOrDefault(n => n.Id == id);
            if (transactionDb != null)
            {
                transactionDb.Type = transaction.Type;
                transactionDb.Amount = transaction.Amount;
                transactionDb.Category = transaction.Category;
                transactionDb.UpdatedAt = transaction.UpdatedAt;
                context.Transactions.Update(transactionDb);
                context.SaveChanges();
            }
            return transactionDb;

        }
    }
}
