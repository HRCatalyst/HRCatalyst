import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ParticipantEffects } from './participant.effects';

describe('ParticipantEffects', () => {
  let actions$: Observable<any>;
  let effects: ParticipantEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParticipantEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ParticipantEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
