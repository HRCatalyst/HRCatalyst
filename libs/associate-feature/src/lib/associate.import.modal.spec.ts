import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateImportModalComponent } from './associate.import.modal';

describe('AssociateImportModalComponent', () => {
  let component: AssociateImportModalComponent;
  let fixture: ComponentFixture<AssociateImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
