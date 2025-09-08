import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserSubject.next('user');
    }
  }

  login(credentials: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.apiUrl + '/login', credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response: AuthResponse) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next('user');
          }
        })
      );
  }

  register(credentials: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.apiUrl + '/register', credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response: AuthResponse) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next('user');
          }
        })
      );
  }

  logout(): void {
    console.log('Logging out user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
