import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

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
