import * as fromQuestion from './question.actions';

describe('loadQuestions', () => {
  it('should return an action', () => {
    expect(fromQuestion.loadQuestions().type).toBe('[Question] Load Questions');
  });
});
