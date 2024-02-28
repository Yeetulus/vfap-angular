import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
              "../../../../style.scss"]
})
export class AdminComponent {


  logout() {
    this.authService.logout();
  }
  changePasswordForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.passwordPatternValidator()]],
      confirmPassword: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.changePasswordForm.get('confirmPassword')!.setValidators([
      Validators.required,
      this.passwordMatchValidator(this.changePasswordForm.get('newPassword')!),
    ]);
  }

  passwordPatternValidator() {
    return Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.,]).{6,}$/);
  }

  passwordMatchValidator(passwordControl: AbstractControl) {
    return (control: AbstractControl) => {
      return control.value === passwordControl.value ? null : { mismatch: true };
    };
  }
  onSubmitPassword() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      this.authService.forceChangePassword(formData.email, formData.newPassword).subscribe(value => {
        this.changePasswordForm.reset();
      });
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.registerLibrarian(formData.firstname, formData.lastname, formData.email, formData.password).subscribe();
    }
  }

  hasErrorClass(){
    if(this.changePasswordForm.get('newPassword')?.hasError('pattern') &&
    this.changePasswordForm.get('newPassword')?.hasError('minlength')) return "form-field-margin1";
    else if(this.changePasswordForm.get('newPassword')?.hasError('pattern') ||
      this.changePasswordForm.get('newPassword')?.hasError('minlength')) return "form-field-margin2";
    else return "";
  }

}
