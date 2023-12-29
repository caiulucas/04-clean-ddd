import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Answer Question Use Case', () => {
	let answersRepository: AnswersRepository;
	let sut: AnswerQuestionUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryQuestionsRepository();
		sut = new AnswerQuestionUseCase(answersRepository);
	});

	it('should be able to create an question', async () => {
		const { answer } = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content:
				'Hi, this is a testing content for this question. How are you doing today?',
		});

		expect(answer.id).toBeTruthy();
	});
});
