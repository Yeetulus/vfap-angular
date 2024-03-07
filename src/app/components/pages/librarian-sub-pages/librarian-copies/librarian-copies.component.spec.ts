import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianCopiesComponent } from './librarian-copies.component';

describe('LibrarianCopiesComponent', () => {
  let component: LibrarianCopiesComponent;
  let fixture: ComponentFixture<LibrarianCopiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianCopiesComponent]
    });
    fixture = TestBed.createComponent(LibrarianCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
