import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard = () => {
  // Your authentication guard logic here
  const authService = inject(AuthService);
  const router = inject(Router);

  // Implement your guard logic here
  if (!authService.isAuthenticated()) {
    // User is not authenticated, redirect to login
    router.navigate(['/login']);
    return false;
  }
  // User is authenticated, allow access
  return true;
};


