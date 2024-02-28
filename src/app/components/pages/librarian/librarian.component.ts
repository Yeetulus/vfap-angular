import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent {

  constructor(private authService:AuthService) {
  }
  logout() {
    this.authService.logout();
  }

  onLogoClick() {

  }
}
