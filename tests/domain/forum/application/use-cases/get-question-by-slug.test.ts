import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Get Question By Slug ', () => {
	let questionsRepository: QuestionsRepository;
	let sut: GetQuestionBySlugUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(questionsRepository);
	});

	it('should be able to get a question by slug', async () => {
		const newQuestion = makeQuestion({
			slug: Slug.createFromText('Example question'),
		});

		questionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: 'example-question',
		});

		expect(question.id).toBeTruthy();
		expect(question.title).toBe(question.title);
	});
});
