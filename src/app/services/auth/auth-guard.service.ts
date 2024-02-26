import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {UserRole} from "../../models/auth/user-role";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    let tokenValid = this.authService.isTokenValid();
    const invertedCheck: boolean = (route.data as { invertedCheck: boolean }).invertedCheck;
    if(invertedCheck) return this.invertedCheck(tokenValid);
    else return this.tokenCheck(tokenValid, route);
  }

  private tokenCheck(tokenValid: Observable<boolean>, route: ActivatedRouteSnapshot) {
    return tokenValid.pipe(
      map((isValid) => {
        if (isValid) {
          const requiredRole: UserRole = (route.data as { requiredRole: UserRole }).requiredRole;
          const storedRole: UserRole | null = this.authService.getUserRole();
          if (this.authService.rolesMatch(requiredRole, storedRole)) {
            console.log(`User has the required role (${requiredRole}). Access granted.`);
            return true;
          } else {
            console.log(`User does not have the required role (${requiredRole}). Access denied.`);
            this.router.navigate(['/login']);
            return false;
          }
        } else {
          console.log('Invalid token, rerouting to login screen');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        console.log('Error checking token validity, rerouting to login screen');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  private invertedCheck(tokenValid: Observable<boolean>) {
    return tokenValid.pipe(
      map((isValid) => {
          if (isValid) {
            console.log('Token already valid, navigating to main page');
            this.router.navigate(['']);
            return false;
          } else {
            console.log('Token not valid')
            return true;
          }
        }
      ), catchError((err) => {
        console.log("Auth guard error: ", err)
        return of(false);
      })
    );
  }
}
