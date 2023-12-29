import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

type DeleteAnswerUseCaseResponse = Record<string, never>;

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(
		request: DeleteAnswerUseCaseRequest,
	): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(request.answerId);

		if (!answer) {
			throw new Error('Answer not found.');
		}

		if (request.authorId !== answer.authorId.toValue()) {
			throw new Error('Not allowed.');
		}

		await this.answersRepository.delete(answer);

		return {};
	}
}
