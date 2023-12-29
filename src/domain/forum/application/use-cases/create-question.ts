import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

interface CreateQuestionUseCaseResponse {
	question: Question;
}

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		data: CreateQuestionUseCaseRequest,
	): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			...data,
			authorId: new UniqueEntityId(data.authorId),
		});

		await this.questionsRepository.create(question);

		return { question };
	}
}
