import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Create Question Use Case', () => {
	let answersRepository: AnswersRepository;
	let sut: AnswerQuestionUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(answersRepository);
	});

	it('should be able to create an answer', async () => {
		const { answer } = await sut.execute({
			instructionId: '1',
			questionId: '1',
			content:
				'Hi, this is a testing content for this question. How are you doing today?',
		});

		expect(answer.id).toBeTruthy();
	});
});
