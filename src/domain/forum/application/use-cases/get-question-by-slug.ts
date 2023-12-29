import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		data: GetQuestionBySlugUseCaseRequest,
	): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(data.slug);

		if (!question) {
			throw new Error('Question not found.');
		}

		return { question };
	}
}
