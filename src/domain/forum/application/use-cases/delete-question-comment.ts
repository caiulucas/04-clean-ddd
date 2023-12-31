import { Either, Left, Right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		questionComment: QuestionComment;
	}
>;

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute(
		request: DeleteQuestionCommentUseCaseRequest,
	): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsRepository.findById(
			request.questionCommentId,
		);

		if (!questionComment) {
			return Left.create(new ResourceNotFoundError());
		}

		if (questionComment.authorId.toValue() !== request.authorId) {
			return Left.create(new NotAllowedError());
		}

		await this.questionCommentsRepository.delete(questionComment);

		return Right.create({ questionComment });
	}
}
