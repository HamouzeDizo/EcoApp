// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import { LoginServiceService } from "./login-service.service";
import { catchError, map, switchMap } from 'rxjs/operators';
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  fromP=false;

  // Key for storing authentication information in localStorage
  private readonly AUTH_KEY = 'auth_token';
  private readonly USER_DETAILS_KEY = 'user_details';

  constructor(private router: Router, private loginService: LoginServiceService) {
    // Check localStorage on service initialization
    const storedToken = localStorage.getItem(this.AUTH_KEY);
    this.isAuthenticated = !!storedToken; // Set isAuthenticated based on whether there is a stored token
  }

  login(email: string, password: string): Observable<boolean> {
    if (email == null || email === "" || password == null || password === "") {
      console.log("empty");
      this.isAuthenticated = false;
      return of(this.isAuthenticated);
    } else {
      return this.loginService.checkLog(email, password).pipe(
        switchMap(data => {
          if (data == null) {
            console.log("null");
            this.isAuthenticated = false;
          } else {
            this.isAuthenticated = true;
            // Store authentication information in localStorage
            localStorage.setItem(this.AUTH_KEY, 'token_user_info');
            // Store user details in localStorage
            localStorage.setItem(this.USER_DETAILS_KEY, JSON.stringify(data));
            console.log("did log")
          }
          return of(this.isAuthenticated);
        }),
        catchError(error => {
          console.log("Error:", error);
          this.isAuthenticated = false;
          return of(this.isAuthenticated);
        })
      );
    }
  }



  logout2(){
    this.isAuthenticated = false;
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_DETAILS_KEY);
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
    // Remove authentication information and user details from localStorage on logout
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_DETAILS_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Method to get user details
  getUserDetails(): any {
    const userDetailsString = localStorage.getItem(this.USER_DETAILS_KEY);
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }
}
