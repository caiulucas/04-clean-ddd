import { Either, Left, Right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		request: EditAnswerUseCaseRequest,
	): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			return Left.create(new ResourceNotFoundError());
		}

		if (request.authorId !== answer.authorId.toValue()) {
			return Left.create(new NotAllowedError());
		}

		answer.content = request.content;

		await this.answersRepository.save(answer);

		return Right.create({ answer });
	}
}
