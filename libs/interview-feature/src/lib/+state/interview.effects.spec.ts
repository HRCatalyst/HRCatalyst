import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InterviewEffects } from './interview.effects';

describe('InterviewEffects', () => {
  let actions$: Observable<any>;
  let effects: InterviewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InterviewEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(InterviewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
