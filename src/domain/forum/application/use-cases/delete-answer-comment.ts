import { Either, Left, Right } from '@/core/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, Record<string, never>>;

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute(
		request: DeleteAnswerCommentUseCaseRequest,
	): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentsRepository.findById(
			request.answerCommentId,
		);

		if (!answerComment) {
			return Left.create('Answer comment not found');
		}

		if (answerComment.authorId.toValue() !== request.authorId) {
			return Left.create('Not allowed');
		}

		await this.answerCommentsRepository.delete(answerComment);

		return Right.create({});
	}
}
