import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantImportComponent } from './participant.import';

describe('ParticipantImportComponent', () => {
  let component: ParticipantImportComponent;
  let fixture: ComponentFixture<ParticipantImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
