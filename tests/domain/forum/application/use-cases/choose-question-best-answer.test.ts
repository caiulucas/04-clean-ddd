import { ChooseQuestionBestAnswer } from '@/domain/forum/application/use-cases/choose-quetion-best-answer';
import { makeAnswer } from '../factories/make-answer';
import { makeQuestion } from '../factories/make-question';
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from '../repositories/in-memory-questions-repository';

describe('Choose Question Best Answer Use Case', () => {
	let questionsRepository: InMemoryQuestionsRepository;
	let answersRepository: InMemoryAnswersRepository;
	let sut: ChooseQuestionBestAnswer;

	beforeEach(() => {
		questionsRepository = new InMemoryQuestionsRepository();
		answersRepository = new InMemoryAnswersRepository();
		sut = new ChooseQuestionBestAnswer(questionsRepository, answersRepository);
	});

	it('should be able to choose the question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});

		await questionsRepository.create(question);
		await answersRepository.create(answer);

		expect(answersRepository.items).toHaveLength(1);

		await sut.execute({
			authorId: question.authorId.toValue(),
			questionId: question.id.toValue(),
			answerId: answer.id.toValue(),
		});

		expect(questionsRepository.items[0].bestAnswerId).toBe(answer.id);
	});

	it('should be not able to choose another author`s question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});

		await questionsRepository.create(question);
		await answersRepository.create(answer);

		await expect(
			async () =>
				await sut.execute({
					authorId: 'some-author-id',
					answerId: answer.id.toValue(),
					questionId: question.id.toValue(),
				}),
		).rejects.toThrowError();
	});
});
