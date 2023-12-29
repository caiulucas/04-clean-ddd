import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface EditAnswerUseCaseResponse {
	answer: Answer;
}

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		request: EditAnswerUseCaseRequest,
	): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			throw new Error('Resource Not found.');
		}

		if (request.authorId !== answer.authorId.toValue()) {
			throw new Error('Not allowed.');
		}

		answer.content = request.content;

		await this.answersRepository.save(answer);

		return { answer };
	}
}
