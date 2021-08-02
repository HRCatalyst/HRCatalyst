import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ImportEffects } from './import.effects';

describe('ImportEffects', () => {
  let actions$: Observable<any>;
  let effects: ImportEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImportEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ImportEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
