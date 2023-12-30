import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {
	answerComment: AnswerComment;
}

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute(
		request: DeleteAnswerCommentUseCaseRequest,
	): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentsRepository.findById(
			request.answerCommentId,
		);

		if (!answerComment) {
			throw new Error('Answer comment not found');
		}

		if (answerComment.authorId.toValue() !== request.authorId) {
			throw new Error('Not allowed');
		}

		await this.answerCommentsRepository.delete(answerComment);

		return { answerComment };
	}
}
