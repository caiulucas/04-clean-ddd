import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from '../../src/domain/use-cases/answer-question';

test('Create an answer', () => {
	const answerQuestion = new AnswerQuestionUseCase();

	const answer = answerQuestion.execute({
		questionId: '1',
		instructionId: '1',
		content: 'Test answer',
	});

	expect(answer.content).toBe('Test answer');
});
