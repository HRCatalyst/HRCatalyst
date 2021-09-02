import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Associate.ModalComponent } from './associate.modal.component';

describe('Associate.ModalComponent', () => {
  let component: Associate.ModalComponent;
  let fixture: ComponentFixture<Associate.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Associate.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Associate.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
