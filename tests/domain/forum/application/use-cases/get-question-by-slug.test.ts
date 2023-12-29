import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Get Question By Slug ', () => {
	let questionsRepository: QuestionsRepository;
	let sut: GetQuestionBySlugUseCase;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(questionsRepository);
	});

	it('should be able to get a question by slug', async () => {
		Question.create({
			title: 'Example question',
			slug: Slug.create('example-question'),
			authorId: new UniqueEntityId(),
			content: 'This is the content of the question.',
		});

		const { question } = await sut.execute({
			slug: 'example-question',
		});

		expect(question.id).toBeTruthy();
		expect(question.title).toBe('Example question');
	});
});
