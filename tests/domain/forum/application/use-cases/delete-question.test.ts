import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Create Question Use Case', () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let sut: DeleteQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(questionsRepository);
	});

	it('should be able to create an answer', async () => {
		const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'));

		await questionsRepository.create(newQuestion);

		expect(questionsRepository.items).toHaveLength(1);

		await sut.execute({
			questionId: 'question-1',
		});

		expect(questionsRepository.items).toHaveLength(0);
	});
});
