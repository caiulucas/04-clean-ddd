import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';
import { makeAnswer } from '../factories/make-answer';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Delete Answer Use Case', () => {
	let answersRepository: InMemoryAnswersRepository;
	let sut: DeleteAnswerUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(answersRepository);
	});

	it('should be able to delete a answer', async () => {
		const newAnswer = makeAnswer();

		await answersRepository.create(newAnswer);

		expect(answersRepository.items).toHaveLength(1);

		await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: newAnswer.authorId.toValue(),
		});

		expect(answersRepository.items).toHaveLength(0);
	});

	it('should be not able to delete a answer from another author', async () => {
		const newAnswer = makeAnswer();

		await answersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: 'some-author-id',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
		expect(answersRepository.items).toHaveLength(1);
	});
});
