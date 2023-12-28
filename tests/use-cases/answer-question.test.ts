import { expect, test } from 'vitest';
import { Answer } from '../../src/domain/entities/answer';
import { AnswersRepository } from '../../src/domain/repositories/answers-repository';
import { AnswerQuestionUseCase } from '../../src/domain/use-cases/answer-question';

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

test('Create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

	const answer = await answerQuestion.execute({
		questionId: '1',
		instructionId: '1',
		content: 'Test answer',
	});

	expect(answer.content).toBe('Test answer');
});
