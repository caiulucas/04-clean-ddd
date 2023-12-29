import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Record<string, never>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		data: DeleteQuestionUseCaseRequest,
	): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(data.questionId);

		if (!question) {
			throw new Error('Question not found.');
		}

		await this.questionsRepository.delete(question);

		return {};
	}
}
