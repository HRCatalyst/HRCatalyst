import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackerrors.ModalComponent } from './feedbackerrors.modal.component';

describe('Feedbackerrors.ModalComponent', () => {
  let component: Feedbackerrors.ModalComponent;
  let fixture: ComponentFixture<Feedbackerrors.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Feedbackerrors.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Feedbackerrors.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
