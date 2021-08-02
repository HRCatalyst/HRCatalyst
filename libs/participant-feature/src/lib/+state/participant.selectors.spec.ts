import * as fromParticipant from './participant.reducer';
import { selectParticipantState } from './participant.selectors';

describe('Participant Selectors', () => {
  it('should select the feature state', () => {
    const result = selectParticipantState({
      [fromParticipant.participantFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
