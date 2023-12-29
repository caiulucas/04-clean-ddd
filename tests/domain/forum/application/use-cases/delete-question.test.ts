import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Delete Question Use Case', () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let sut: DeleteQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(questionsRepository);
	});

	it('should be able to delete a question', async () => {
		const newQuestion = makeQuestion();

		await questionsRepository.create(newQuestion);

		expect(questionsRepository.items).toHaveLength(1);

		await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: newQuestion.authorId.toValue(),
		});

		expect(questionsRepository.items).toHaveLength(0);
	});

	it('should be not able to delete a question from another', async () => {
		const newQuestion = makeQuestion();

		await questionsRepository.create(newQuestion);

		await expect(
			async () =>
				await sut.execute({
					questionId: newQuestion.id.toValue(),
					authorId: 'some-author-id',
				}),
		).rejects.toThrowError();
		expect(questionsRepository.items).toHaveLength(1);
	});
});
