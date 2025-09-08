import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css'],
})
export class TransactionList implements OnInit {
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data) => (this.transactions = data));
  }

  getTotalIncome(): number {
    return this.transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
  }
  getTotalExpense(): number {
    return this.transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }
  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  editTransaction(transaction: Transaction): void {
    console.log('Editing transaction:', transaction);
    if (transaction.id) {
      // Navigate to the edit form with the selected transaction's ID
      this.router.navigate(['/edit/', transaction.id]);
    }
  }

  deleteTransaction(transaction: Transaction): void {
    if (transaction.id) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        console.log('Deleting transaction:', transaction.id);
        this.transactionService.deleteTransaction(transaction.id).subscribe({
          next: () => {
            console.log('Transaction deleted successfully');
            this.loadTransactions();
          },
          error: (err) => {
            console.log('Error deleting transaction:', err);
          },
        });
      }
    }
  }
}
