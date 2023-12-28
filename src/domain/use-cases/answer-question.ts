import { Answer } from '../entities/answer';

interface AnswerQuestionUseCaseRequest {
	instructionId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	execute(data: AnswerQuestionUseCaseRequest) {
		return new Answer({ authorId: data.questionId, ...data });
	}
}
