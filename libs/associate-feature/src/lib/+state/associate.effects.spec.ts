import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AssociateEffects } from './associate.effects';

describe('AssociateEffects', () => {
  let actions$: Observable<any>;
  let effects: AssociateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssociateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AssociateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
