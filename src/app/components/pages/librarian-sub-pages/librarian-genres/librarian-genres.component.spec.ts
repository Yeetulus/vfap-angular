import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianGenresComponent } from './librarian-genres.component';

describe('LibrarianGenresComponent', () => {
  let component: LibrarianGenresComponent;
  let fixture: ComponentFixture<LibrarianGenresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianGenresComponent]
    });
    fixture = TestBed.createComponent(LibrarianGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
