import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStarsComponent } from './review-stars.component';

describe('ReviewStarsComponent', () => {
  let component: ReviewStarsComponent;
  let fixture: ComponentFixture<ReviewStarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewStarsComponent]
    });
    fixture = TestBed.createComponent(ReviewStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
