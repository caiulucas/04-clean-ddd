import { AnswerComment } from '../../enterprise/entities/question-comment';

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
}
