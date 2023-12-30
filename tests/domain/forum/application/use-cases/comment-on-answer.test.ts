import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { makeAnswer } from '../factories/make-answer';
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';

describe('Comment On Answer Use Case', () => {
	let answersRepository: AnswersRepository;
	let answerCommentsRepository: InMemoryAnswerCommentsRepository;
	let sut: CommentOnAnswerUseCase;

	beforeEach(() => {
		answersRepository = new InMemoryAnswersRepository();
		answerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			answersRepository,
			answerCommentsRepository,
		);
	});

	it('should be able to comment on a answer', async () => {
		const answer = makeAnswer();

		await answersRepository.create(answer);

		const content =
			'Hi, this is a testing content for this comment. How are you doing today?';

		await sut.execute({
			authorId: 'author-1',
			answerId: answer.id.toValue(),
			content,
		});

		expect(answerCommentsRepository.items[0].content).toBe(content);
	});
});
