import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

interface EditQuestionUseCaseResponse {
	question: Question;
}

export class EditQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute(
		request: EditQuestionUseCaseRequest,
	): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(
			request.questionId,
		);

		if (!question) {
			throw new Error('Resource Not found.');
		}

		if (request.authorId !== question.authorId.toValue()) {
			throw new Error('Not allowed.');
		}

		question.title = request.title;
		question.content = request.content;

		await this.questionsRepository.save(question);

		return { question };
	}
}
