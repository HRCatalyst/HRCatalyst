import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClientEffects } from './client.effects';

describe('ClientEffects', () => {
  let actions$: Observable<any>;
  let effects: ClientEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ClientEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
