import { Either, Left, Right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	Record<string, never>
>;

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		request: DeleteAnswerUseCaseRequest,
	): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			return Left.create(new ResourceNotFoundError());
		}

		if (request.authorId !== answer.authorId.toValue()) {
			return Left.create(new NotAllowedError());
		}

		await this.answersRepository.delete(answer);

		return Right.create({});
	}
}
