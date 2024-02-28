import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {RegistrationRequest} from "../../../models/auth/registration-request";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private authService: AuthService) {}

  register() {
    let request:RegistrationRequest = {email: this.email, firstname: this.firstname, lastname: this.lastname, password: this.password};
    this.authService.registerUser(request);
  }
}
