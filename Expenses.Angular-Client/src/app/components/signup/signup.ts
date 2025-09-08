import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return ((control?.touched || control?.dirty) && control.hasError(errorName)) || false;
  }

  private passwordMatchValidator(fg: FormGroup) {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.signupForm.valid) {
      const signUp = this.signupForm.value;
      this.authService.register(signUp).subscribe({
        next: () => {
          // Handle successful signup
          this.router.navigate(['/transactions']);
        },
        error: (err) => {
          // Handle signup error
          console.error('Signup error', err);
          this.errorMessage =
            err.error?.message || 'An error occurred during signup. Please try again.';
        },
      });
    }
  }
}
