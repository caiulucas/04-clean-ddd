import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionAnswersUseCaseResponse {
	answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		params: FetchQuestionAnswersUseCaseRequest,
	): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			params.questionId,
			{ page: params.page },
		);

		return { answers };
	}
}
