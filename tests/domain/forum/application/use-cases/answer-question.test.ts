import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Answer Question Use Case', () => {
	let answersRepository: AnswersRepository;
	let sut: AnswerQuestionUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(answersRepository);
	});

	it('should be able to create an question', async () => {
		const response = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content:
				'Hi, this is a testing content for this question. How are you doing today?',
		});

		expect(response.isRight()).toBe(true);
		expect(response.value?.answer).toBeTruthy();
	});
});
