import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Answer Question Use Case', () => {
	let questionsRepository: QuestionsRepository;
	let sut: CreateQuestionUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(questionsRepository);
	});

	it('should be able to create an question', async () => {
		const { question } = await sut.execute({
			authorId: '1',
			title: 'Test question',
			content:
				'Hi, this is a testing content for this question. How are you doing today?',
		});

		expect(question.id).toBeTruthy();
	});
});
