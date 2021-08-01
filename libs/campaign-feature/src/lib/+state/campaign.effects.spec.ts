import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CampaignEffects } from './campaign.effects';

describe('CampaignEffects', () => {
  let actions$: Observable<any>;
  let effects: CampaignEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CampaignEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CampaignEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
