import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { FetchRecentQuestions } from '@/domain/forum/application/use-cases/fetch-recent-questions';
import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Fetch Recent Questions ', () => {
	let questionsRepository: QuestionsRepository;
	let sut: FetchRecentQuestions;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		sut = new FetchRecentQuestions(questionsRepository);

		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should be able to fetch recent questions', async () => {
		vi.setSystemTime(new Date(2024, 0, 13));
		const firstQuestion = makeQuestion();
		vi.setSystemTime(new Date(2024, 0, 10));
		const secondQuestion = makeQuestion();
		vi.setSystemTime(new Date(2024, 0, 8));
		const thirdQuestion = makeQuestion();

		await questionsRepository.create(secondQuestion);
		await questionsRepository.create(firstQuestion);
		await questionsRepository.create(thirdQuestion);

		const { questions } = await sut.execute({ page: 1 });

		expect(questions).toHaveLength(3);
		expect(questions).toEqual([
			expect.objectContaining({
				createdAt: firstQuestion.createdAt,
			}),
			expect.objectContaining({
				createdAt: secondQuestion.createdAt,
			}),
			expect.objectContaining({
				createdAt: thirdQuestion.createdAt,
			}),
		]);
	});

	it('should be able to fetch paginated recent questions', async () => {
		for (let i = 0; i < 22; i++) {
			await questionsRepository.create(makeQuestion());
		}

		const { questions } = await sut.execute({ page: 2 });

		expect(questions).toHaveLength(2);
	});
});