import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import { MainContentComponent } from './components/pages/main-content/main-content.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { LoansComponent } from './components/loans/loans.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { SidebarContentComponent } from './components/pages/sidebar-content/sidebar-content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibrarianComponent } from './components/pages/librarian/librarian.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { BookResultsComponent } from './components/book-results/book-results.component';
import {MatDividerModule} from "@angular/material/divider";
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RoutingModule} from "./modules/routing/routing.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { GenreComponent } from './components/genre/genre.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    LoginComponent,
    RegistrationComponent,
    ReservationsComponent,
    LoansComponent,
    AdminComponent,
    SidebarContentComponent,
    SidebarComponent,
    LibrarianComponent,
    BookViewComponent,
    BookResultsComponent,
    TopBarComponent,
    GenreComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        RoutingModule,
        HttpClientModule,
        MatDividerModule,
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
