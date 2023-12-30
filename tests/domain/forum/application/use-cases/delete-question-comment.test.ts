import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
import { makeQuestionComment } from '../factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory-question-comments-repository';

describe('Delete Question Comment Use Case', () => {
	let questionCommentsRepository: InMemoryQuestionCommentsRepository;
	let sut: DeleteQuestionCommentUseCase;

	beforeEach(() => {
		questionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new DeleteQuestionCommentUseCase(questionCommentsRepository);
	});

	it('should be able to delete a question comment', async () => {
		const questionComment = makeQuestionComment();

		await questionCommentsRepository.create(questionComment);

		expect(questionCommentsRepository.items).toHaveLength(1);

		await sut.execute({
			authorId: questionComment.authorId.toValue(),
			questionCommentId: questionComment.id.toValue(),
		});

		expect(questionCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete another author question comment', async () => {
		const questionComment = makeQuestionComment();

		await questionCommentsRepository.create(questionComment);

		await expect(
			async () =>
				await sut.execute({
					authorId: 'some-author-id',
					questionCommentId: questionComment.id.toValue(),
				}),
		).rejects.toThrowError();

		expect(questionCommentsRepository.items).toHaveLength(1);
	});
});
