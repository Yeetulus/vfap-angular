import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {RegistrationRequest} from "../../models/auth/registration-request";
import {AuthResponse} from "../../models/auth/auth-response";
import {AuthRequest} from "../../models/auth/auth-request";
import {ApiService} from "../api/api.service";
import {UserRole} from "../../models/auth/user-role";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";
import {User} from "../../models/auth/user";
import {parseJsonSchemaToOptions} from "@angular/cli/src/command-builder/utilities/json-schema";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = "auth/"
  private refreshTokenName = 'refresh_token';
  private accessTokenName = 'access_token';

  constructor(private router: Router, private apiService: ApiService, private notificationService: NotificationService) {}

  registerUser(request: RegistrationRequest) {
    this.apiService.post<AuthResponse>(
      `${this.authUrl}register-user`,
      request,
      undefined,
      false,
      (response: AuthResponse) => {
        console.log('Registration successful:', response);
        this.authenticated(response);
      },
      (error: HttpErrorResponse, statusCode: number) => {
        if (statusCode === HttpStatusCode.BadRequest) {
          this.notificationService.showNotification(error.message, NotificationType.Error);
        }
        console.error('Error during registration:', error);
      }
    ).subscribe();
  }

  login(request: AuthRequest) {
    this.apiService.post<AuthResponse>(
      `${this.authUrl}login/authenticate`,
      request,
      undefined,
      false,
      (response: AuthResponse) => {
        console.log('Authentication successful:', response);
        this.notificationService.showNotification("Logged in", NotificationType.Success);
        this.authenticated(response);
        this.router.navigate([""]);
      },
      (error: HttpErrorResponse, statusCode: number) => {

        this.notificationService.showNotification("Incorrect email or password", NotificationType.Error);
        console.error('Error during authentication:', error);
      }
    ).subscribe();
  }
  authenticated(response:AuthResponse){
    localStorage.setItem("userId", response.user_id.toString());
    localStorage.setItem(this.accessTokenName, response.access_token);
    localStorage.setItem(this.refreshTokenName, response.refresh_token);
    localStorage.setItem('userRole', response.role.toString());
    switch (response.role){
      case UserRole.LIBRARIAN:
        this.router.navigate(['/librarian']);
        break;
      case UserRole.ADMIN:
        this.router.navigate(['/admin']);
        break;
      case UserRole.MEMBER:
        this.router.navigate(['']);
        break;
    }
  }

  logout(): void {
    localStorage.removeItem("userId");
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
    localStorage.removeItem("userRole");

    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    console.log("Refreshing token")
    return this.apiService.refreshToken<AuthResponse>(`${this.authUrl}refresh-token`,  )
  }

  isAuthenticated(role? :UserRole){
    return of(this.isTokenValid() && this.getUserRole() === role);
  }
  isTokenValid(): Observable<boolean> {
    const accessToken = localStorage.getItem(this.accessTokenName);
    if (accessToken === null) {
      localStorage.removeItem("userId");
      localStorage.removeItem(this.refreshTokenName);
      localStorage.removeItem("userRole");
      return of(false);
    }
    const decodedToken = this.decodeJwt(accessToken);
    if (!decodedToken || !decodedToken.exp) {
      return of(false);
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      return of(true);
    } else {
      localStorage.removeItem(this.accessTokenName);
      localStorage.removeItem("userId");
      const refreshToken = localStorage.getItem(this.refreshTokenName);

      if (refreshToken) {
        return this.refreshToken().pipe(
          map((response) => {
            this.authenticated(response);
            return true;
          }),
          catchError(() => {
            return of(false);
          })
        );
      } else {

        return of(false);
      }
    }
  }

  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding JWT', error);
      return null;
    }
  }

  getUserRole(): UserRole|null {
    const roleString: string | null = localStorage.getItem('userRole');

    if (roleString !== null) {
      return UserRole[roleString as keyof typeof UserRole];
    }

    return null;
  }

  rolesMatch(requiredRole: UserRole|null, userRole: UserRole|null){
    return requiredRole && userRole && userRole === requiredRole;
  }


}
