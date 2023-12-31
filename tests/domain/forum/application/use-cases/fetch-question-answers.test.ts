import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { makeAnswer } from '../factories/make-answer';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Fetch Question Answers', () => {
	let answersRepository: AnswersRepository;
	let sut: FetchQuestionAnswersUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionAnswersUseCase(answersRepository);

		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be able to fetch question answers', async () => {
		await answersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId('question-1'),
			}),
		);
		await answersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId('question-1'),
			}),
		);
		await answersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId('question-1'),
			}),
		);

		const { answers } = await sut.execute({
			questionId: 'question-1',
			page: 1,
		});

		expect(answers).toHaveLength(3);
	});

	it('should be able to fetch paginated answers', async () => {
		for (let i = 0; i < 22; i++) {
			await answersRepository.create(
				makeAnswer({ questionId: new UniqueEntityId('question-1') }),
			);
		}

		const { answers } = await sut.execute({
			questionId: 'question-1',
			page: 2,
		});

		expect(answers).toHaveLength(2);
	});
});