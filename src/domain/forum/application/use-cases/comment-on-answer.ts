import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { AnswersRepository } from '../repositories/answers-repository';

interface CommentOnAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface CommentOnAnswerUseCaseResponse {
	answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentsRepository: AnswerCommentsRepository,
	) {}

	async execute(
		request: CommentOnAnswerUseCaseRequest,
	): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			throw new Error('Answer not found');
		}

		const answerComment = AnswerComment.create({
			...request,
			authorId: new UniqueEntityId(request.authorId),
			answerId: answer.id,
		});

		await this.answerCommentsRepository.create(answerComment);

		return { answerComment };
	}
}
