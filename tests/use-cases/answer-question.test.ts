import { Answer } from '@/domain/entities/answer';
import { AnswersRepository } from '@/domain/repositories/answers-repository';
import { AnswerQuestionUseCase } from '@/domain/use-cases/answer-question';

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
