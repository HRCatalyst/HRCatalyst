import * as fromParticipant from './participant.actions';

describe('loadParticipants', () => {
  it('should return an action', () => {
    expect(fromParticipant.loadParticipants().type).toBe('[Participant] Load Participants');
  });
});
