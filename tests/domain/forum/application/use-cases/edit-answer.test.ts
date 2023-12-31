import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';
import { makeAnswer } from '../factories/make-answer';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Edit Answer Use Case', () => {
	let answersRepository: InMemoryAnswersRepository;
	let sut: EditAnswerUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(answersRepository);
	});

	it('should be able to edit a answer', async () => {
		const newAnswer = makeAnswer();

		await answersRepository.create(newAnswer);

		const editedAnswer = {
			authorId: newAnswer.authorId.toValue(),
			answerId: newAnswer.id.toValue(),
			content: 'This is a new content',
		};

		await sut.execute(editedAnswer);

		expect(answersRepository.items[0]).toMatchObject({
			content: editedAnswer.content,
		});
	});

	it('should be not able to edit a answer from another author', async () => {
		const newAnswer = makeAnswer();

		await answersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: 'some-author-id',
			content: 'This is a new content',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
