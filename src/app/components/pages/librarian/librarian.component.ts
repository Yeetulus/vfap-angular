import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserRole} from "../../../models/auth/user-role";
import {MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css',
          '../../../../style.scss']
})
export class LibrarianComponent {
  public activePath = 0;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  isSmallScreen = false;

  constructor(public authService:AuthService,
              public router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  logout() {
    this.authService.logout();
  }

  onLogoClick() {

  }

  protected readonly UserRole = UserRole;

  handlePersonIconClick() {
    this.authService.isTokenValid().subscribe(value => {
      if (!value) this.router.navigate(["/login"]);
      else if (this.menuTrigger && this.isSmallScreen) {
        this.menuTrigger.openMenu();
      }
      else{
        this.logout();
      }
    })
  }


  loansButtonClicked() {
    this.router.navigate(['/librarian']);
  }

  genresButtonClicked() {
    this.router.navigate(['/librarian/genres']);
  }

  copiesButtonClicked() {
    this.router.navigate(['/librarian/copies']);
  }

  booksButtonClicked() {
    this.router.navigate(['/librarian/books']);
  }

  authorsButtonClicked() {
    this.router.navigate(['/librarian/authors']);
  }
}
