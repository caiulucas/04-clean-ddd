import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Create Question Use Case', () => {
	let questionsRepository: QuestionsRepository;
	let sut: CreateQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(questionsRepository);
	});

	it('should be able to create an answer', async () => {
		const result = await sut.execute({
			title: 'Answer test',
			authorId: '1',
			content:
				'Hi, this is a testing content for this question. How are you doing today?',
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.question.id).toBeTruthy();
	});
});
