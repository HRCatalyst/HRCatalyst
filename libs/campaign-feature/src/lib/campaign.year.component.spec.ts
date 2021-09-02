import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignYearComponent } from './campaign.year.component';

describe('CampaignYearComponent', () => {
  let component: CampaignYearComponent;
  let fixture: ComponentFixture<CampaignYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
