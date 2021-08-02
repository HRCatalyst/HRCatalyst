import * as fromFeedback from './feedback.actions';

describe('loadFeedbacks', () => {
  it('should return an action', () => {
    expect(fromFeedback.loadFeedbacks().type).toBe('[Feedback] Load Feedbacks');
  });
});
