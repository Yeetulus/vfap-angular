import { Component } from '@angular/core';
import {RegistrationRequest} from "../../../models/auth/registration-request";
import {AuthResponse} from "../../../models/auth/auth-response";
import {AuthRequest} from "../../../models/auth/auth-request";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}

  login(): void {
    const request: AuthRequest = { email: this.username, password: this.password };
    this.authService.login(request);
  }

  register(): void {
    const request: RegistrationRequest = { firstName: '', lastName: '', email: this.username, password: this.password };
    this.authService.registerUser(request);
  }
}
