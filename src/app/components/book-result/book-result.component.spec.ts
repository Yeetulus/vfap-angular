import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookResultComponent } from './book-result.component';

describe('BookResultComponent', () => {
  let component: BookResultComponent;
  let fixture: ComponentFixture<BookResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookResultComponent]
    });
    fixture = TestBed.createComponent(BookResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
