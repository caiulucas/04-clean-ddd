import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
}

type DeleteQuestionUseCaseResponse = Record<string, never>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		request: DeleteQuestionUseCaseRequest,
	): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(
			request.questionId,
		);

		if (!question) {
			throw new Error('Question not found.');
		}

		if (request.authorId !== question.authorId.toValue()) {
			throw new Error('Not allowed.');
		}

		await this.questionsRepository.delete(question);

		return {};
	}
}
