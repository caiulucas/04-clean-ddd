import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {
	questionComment: QuestionComment;
}

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute(
		request: DeleteQuestionCommentUseCaseRequest,
	): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsRepository.findById(
			request.questionCommentId,
		);

		if (!questionComment) {
			throw new Error('Question comment not found');
		}

		if (questionComment.authorId.toValue() !== request.authorId) {
			throw new Error('Not allowed');
		}

		await this.questionCommentsRepository.delete(questionComment);

		return { questionComment };
	}
}
