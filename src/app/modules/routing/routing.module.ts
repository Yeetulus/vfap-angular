import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../../services/auth/auth-guard.service";
import {MainContentComponent} from "../../components/pages/main-content/main-content.component";
import {RegistrationComponent} from "../../components/pages/registration/registration.component";
import {LoginComponent} from "../../components/pages/login/login.component";
import {ReservationsComponent} from "../../components/pages/reservations/reservations.component";
import {LoansComponent} from "../../components/pages/loans/loans.component";
import {SidebarContentComponent} from "../../components/pages/sidebar-content/sidebar-content.component";
import {AdminComponent} from "../../components/pages/admin/admin.component";
import {LibrarianComponent} from "../../components/pages/librarian/librarian.component";
import {BookViewComponent} from "../../components/pages/book-view/book-view.component";
import {BookResultsComponent} from "../../components/pages/book-results/book-results.component";
import {UserRole} from "../../models/auth/user-role";
import {
  LibrarianLoansComponent
} from "../../components/pages/librarian-sub-pages/librarian-loans/librarian-loans.component";
import {
  LibrarianGenresComponent
} from "../../components/pages/librarian-sub-pages/librarian-genres/librarian-genres.component";
import {
  LibrarianBooksComponent
} from "../../components/pages/librarian-sub-pages/librarian-books/librarian-books.component";
import {
  LibrarianAuthorsComponent
} from "../../components/pages/librarian-sub-pages/librarian-authors/librarian-authors.component";
import {
  LibrarianCopiesComponent
} from "../../components/pages/librarian-sub-pages/librarian-copies/librarian-copies.component";

const sidebarContentRoutes: Routes = [
  { path: '', component: BookResultsComponent, },

];

const mainContentRoutes: Routes = [
  { path: '', component: SidebarContentComponent, children: sidebarContentRoutes},
  { path: 'book-view', component: BookViewComponent,},
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuardService], data: {'requiredRole': UserRole.MEMBER}},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService], data: {'requiredRole': UserRole.MEMBER}},
];

const librarianContentRoutes: Routes = [
  { path: '', component: LibrarianLoansComponent},
  { path: 'genres', component: LibrarianGenresComponent},
  { path: 'books', component: LibrarianBooksComponent},
  { path: 'authors', component: LibrarianAuthorsComponent},
  { path: 'copies', component: LibrarianCopiesComponent},
];

const routes: Routes = [
  { path: '', component: MainContentComponent, children: mainContentRoutes},
  { path: 'librarian', component: LibrarianComponent, children: librarianContentRoutes, canActivate: [AuthGuardService], data: {'requiredRole': UserRole.LIBRARIAN}},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], data: {'requiredRole': UserRole.ADMIN}},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService], data: {'invertedCheck': true}},
  { path: 'register', component: RegistrationComponent, canActivate: [AuthGuardService], data: {'invertedCheck': true}},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
