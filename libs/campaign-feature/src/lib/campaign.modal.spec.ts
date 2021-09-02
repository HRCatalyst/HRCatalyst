import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Campaign.ModalComponent } from './campaign.modal.component';

describe('Campaign.ModalComponent', () => {
  let component: Campaign.ModalComponent;
  let fixture: ComponentFixture<Campaign.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Campaign.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Campaign.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
