import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Edit Question Use Case', () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let sut: EditQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(questionsRepository);
	});

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion();

		await questionsRepository.create(newQuestion);

		const editedQuestion = {
			authorId: newQuestion.authorId.toValue(),
			questionId: newQuestion.id.toValue(),
			title: 'Edited question',
			content: 'This is a new content',
		};

		await sut.execute(editedQuestion);

		expect(questionsRepository.items[0]).toMatchObject({
			title: editedQuestion.title,
			content: editedQuestion.content,
		});
	});

	it('should be not able to edit a question from another author', async () => {
		const newQuestion = makeQuestion();

		await questionsRepository.create(newQuestion);

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: 'some-author-id',
			title: 'Edited question',
			content: 'This is a new content',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
