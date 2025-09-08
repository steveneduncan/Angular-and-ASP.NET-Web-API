import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.css'],
})
export class TransactionForm implements OnInit {
  transactionForm: FormGroup;
  incomeCategories = ['Salary', 'Freelance', 'Investments'];
  expenseCategories = ['Food', 'Transportation', 'Entertainment'];

  availableCategories: string[] = [];
  editMode = false;
  transactionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      updatedAt: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateAvailableCategories(this.transactionForm.get('type')?.value);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.transactionId = +id;

      this.loadTransaction(this.transactionId);
    }
  }

  private updateAvailableCategories(type: string): void {
    this.availableCategories = type === 'Income' ? this.incomeCategories : this.expenseCategories;
    this.transactionForm.patchValue({ category: '' });
  }

  onTypeChange(): void {
    const selectedType = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(selectedType);
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      // Handle form submission
      const transaction = this.transactionForm.value;

      // Convert updatedAt from string to Date
      if (transaction.updatedAt) {
        transaction.updatedAt = new Date(transaction.updatedAt);
      }

      if (this.editMode && this.transactionId) {
        this.transactionService.updateTransaction(this.transactionId, transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            console.log('Error - ', err);
          },
        });
      } else {
        // new transaction set createdAt = updatedAt
        transaction.createdAt = transaction.updatedAt;
        console.log('Form submitted:', transaction);
        this.transactionService.createTransaction(transaction).subscribe({
          next: (data) => {
            console.log('Transaction created:', data);
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          },
        });
      }
    }
  }

  private loadTransaction(id: number): void {
    this.transactionService.getTransactionById(id).subscribe({
      next: (transaction) => {
        console.log('LoadTransaction:', transaction);

        this.updateAvailableCategories(transaction.type);

        // Format createdAt for input type="date"
        let formattedDate = '';
        if (transaction.updatedAt) {
          const dateObj = new Date(transaction.updatedAt);
          formattedDate = dateObj.toISOString().substring(0, 10);
        }

        this.transactionForm.patchValue({
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount,
          updatedAt: formattedDate,
        });
      },
      error: (err) => {
        console.error('Error loading transaction:', err);
      },
    });
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }
}
