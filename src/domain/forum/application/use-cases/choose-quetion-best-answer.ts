import { Question } from '../../enterprise/entities/question';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ChooseQuestionBestAnswerRequest {
	authorId: string;
	answerId: string;
	questionId: string;
}

interface ChooseQuestionBestAnswerResponse {
	question: Question;
}

export class ChooseQuestionBestAnswer {
	constructor(
		private questionsRepository: QuestionsRepository,
		private answersRepository: AnswersRepository,
	) {}

	async execute(
		request: ChooseQuestionBestAnswerRequest,
	): Promise<ChooseQuestionBestAnswerResponse> {
		const question = await this.questionsRepository.findById(
			request.questionId,
		);

		if (!question) {
			throw new Error('Question not found.');
		}

		if (request.authorId !== question.authorId.toValue()) {
			throw new Error('Not allowed.');
		}

		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			throw new Error('Answer not found.');
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);

		return { question };
	}
}
