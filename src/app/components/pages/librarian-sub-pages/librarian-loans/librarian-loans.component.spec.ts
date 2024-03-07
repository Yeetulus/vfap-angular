import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianLoansComponent } from './librarian-loans.component';

describe('LibrarianLoansComponent', () => {
  let component: LibrarianLoansComponent;
  let fixture: ComponentFixture<LibrarianLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianLoansComponent]
    });
    fixture = TestBed.createComponent(LibrarianLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
