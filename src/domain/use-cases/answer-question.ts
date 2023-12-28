import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
	instructionId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(data: AnswerQuestionUseCaseRequest) {
		const answer = new Answer({ authorId: data.questionId, ...data });

		await this.answersRepository.create(answer);

		return answer;
	}
}
