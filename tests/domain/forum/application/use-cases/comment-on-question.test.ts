import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Comment On Question Use Case', () => {
	let questionsRepository: QuestionsRepository;
	let questionCommentsRepository: InMemoryQuestionCommentsRepository;
	let sut: CommentOnQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		questionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestionUseCase(
			questionsRepository,
			questionCommentsRepository,
		);
	});

	it('should be able to comment on a question', async () => {
		const question = makeQuestion();

		await questionsRepository.create(question);

		const content =
			'Hi, this is a testing content for this comment. How are you doing today?';

		await sut.execute({
			authorId: 'author-1',
			questionId: question.id.toValue(),
			content,
		});

		expect(questionCommentsRepository.items[0].content).toBe(content);
	});
});
