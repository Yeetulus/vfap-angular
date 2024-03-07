import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianAuthorsComponent } from './librarian-authors.component';

describe('LibrarianAuthorsComponent', () => {
  let component: LibrarianAuthorsComponent;
  let fixture: ComponentFixture<LibrarianAuthorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianAuthorsComponent]
    });
    fixture = TestBed.createComponent(LibrarianAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
