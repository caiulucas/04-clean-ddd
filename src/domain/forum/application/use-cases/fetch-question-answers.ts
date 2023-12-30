import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionAnswersResponse {
	answers: Answer[];
}

export class FetchQuestionAnswers {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		params: FetchQuestionAnswersRequest,
	): Promise<FetchQuestionAnswersResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			params.questionId,
			{ page: params.page },
		);

		return { answers };
	}
}
