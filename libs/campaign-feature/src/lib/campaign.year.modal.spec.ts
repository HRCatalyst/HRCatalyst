import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Campaig.YearComponent } from './campaig.year.component';

describe('Campaig.YearComponent', () => {
  let component: Campaig.YearComponent;
  let fixture: ComponentFixture<Campaig.YearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Campaig.YearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Campaig.YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
