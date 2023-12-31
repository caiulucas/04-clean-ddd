import { Either, Right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<
	null,
	{
		answer: Answer;
	}
>;

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		data: AnswerQuestionUseCaseRequest,
	): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			...data,
			authorId: new UniqueEntityId(data.instructorId),
			questionId: new UniqueEntityId(data.questionId),
		});

		await this.answersRepository.create(answer);

		return Right.create({ answer });
	}
}
