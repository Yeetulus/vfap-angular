import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../../services/auth/auth-guard.service";
import {MainContentComponent} from "../../components/pages/main-content/main-content.component";
import {RegistrationComponent} from "../../components/pages/registration/registration.component";
import {LoginComponent} from "../../components/pages/login/login.component";
import {UserRole} from "../../models/auth/user-role";
import {ReservationsComponent} from "../../components/reservations/reservations.component";
import {LoansComponent} from "../../components/loans/loans.component";
import {SidebarContentComponent} from "../../components/pages/sidebar-content/sidebar-content.component";
import {AdminComponent} from "../../components/pages/admin/admin.component";
import {LibrarianComponent} from "../../components/pages/librarian/librarian.component";
import {BookViewComponent} from "../../components/book-view/book-view.component";
import {BookResultsComponent} from "../../components/book-results/book-results.component";

const sidebarContentRoutes: Routes = [
  { path: 'book-view', component: BookViewComponent,},
  { path: '', component: BookResultsComponent, },

];

const mainContentRoutes: Routes = [
  { path: '', component: SidebarContentComponent, children: sidebarContentRoutes},
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuardService], data: {'requiredRole': UserRole.MEMBER}},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardService], data: { 'requiredRole': UserRole.MEMBER } },
];

const routes: Routes = [
  { path: '', component: MainContentComponent, children: mainContentRoutes},
  { path: 'librarian', component: LibrarianComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
