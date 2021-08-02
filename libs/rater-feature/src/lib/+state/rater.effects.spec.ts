import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RaterEffects } from './rater.effects';

describe('RaterEffects', () => {
  let actions$: Observable<any>;
  let effects: RaterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RaterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RaterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
