import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackErrorsComponent } from './feedbackerrors.component';

describe('Feedback.ErrorsComponent', () => {
  let component: FeedbackErrorsComponent;
  let fixture: ComponentFixture<FeedbackErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
