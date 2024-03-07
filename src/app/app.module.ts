import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import { MainContentComponent } from './components/pages/main-content/main-content.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ReservationsComponent } from './components/pages/reservations/reservations.component';
import { LoansComponent } from './components/pages/loans/loans.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { SidebarContentComponent } from './components/pages/sidebar-content/sidebar-content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibrarianComponent } from './components/pages/librarian/librarian.component';
import { BookViewComponent } from './components/pages/book-view/book-view.component';
import { BookResultsComponent } from './components/pages/book-results/book-results.component';
import {MatDividerModule} from "@angular/material/divider";
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RoutingModule} from "./modules/routing/routing.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { GenreComponent } from './components/genre/genre.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FooterComponent } from './components/footer/footer.component';
import { BookResultComponent } from './components/book-result/book-result.component';
import { ReviewStarsComponent } from './components/review-stars/review-stars.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LoanComponent } from './components/loan/loan.component';
import {MatTabsModule} from "@angular/material/tabs";
import { LibrarianLoansComponent } from './components/pages/librarian-sub-pages/librarian-loans/librarian-loans.component';
import { LibrarianGenresComponent } from './components/pages/librarian-sub-pages/librarian-genres/librarian-genres.component';
import { LibrarianBooksComponent } from './components/pages/librarian-sub-pages/librarian-books/librarian-books.component';
import { LibrarianAuthorsComponent } from './components/pages/librarian-sub-pages/librarian-authors/librarian-authors.component';
import { LibrarianCopiesComponent } from './components/pages/librarian-sub-pages/librarian-copies/librarian-copies.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";

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
    GenreComponent,
    FooterComponent,
    BookResultComponent,
    ReviewStarsComponent,
    LoanComponent,
    LibrarianLoansComponent,
    LibrarianGenresComponent,
    LibrarianBooksComponent,
    LibrarianAuthorsComponent,
    LibrarianCopiesComponent,
    SearchBarComponent,
    ModalComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        RoutingModule,
        HttpClientModule,
        MatDividerModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatMenuModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatCardModule,
        MatPaginatorModule,
        MatSliderModule,
        MatTabsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
