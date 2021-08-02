import * as fromQuestion from './question.reducer';
import { selectQuestionState } from './question.selectors';

describe('Question Selectors', () => {
  it('should select the feature state', () => {
    const result = selectQuestionState({
      [fromQuestion.questionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
