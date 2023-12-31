import { Either, Right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

type CreateQuestionUseCaseResponse = Either<
	null,
	{
		question: Question;
	}
>;

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		request: CreateQuestionUseCaseRequest,
	): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			...request,
			authorId: new UniqueEntityId(request.authorId),
		});

		await this.questionsRepository.create(question);

		return Right.create({ question });
	}
}
