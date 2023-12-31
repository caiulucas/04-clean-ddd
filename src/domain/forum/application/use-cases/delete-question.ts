import { Either, Left, Right } from '@/core/either';
import { QuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	Record<string, never>
>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		request: DeleteQuestionUseCaseRequest,
	): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(
			request.questionId,
		);

		if (!question) {
			return Left.create(new ResourceNotFoundError());
		}

		if (request.authorId !== question.authorId.toValue()) {
			return Left.create(new NotAllowedError());
		}

		await this.questionsRepository.delete(question);

		return Right.create({});
	}
}
