import { UniqueEntityId } from '../../core/entities/unique-entity-id';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
	instructionId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute(data: AnswerQuestionUseCaseRequest) {
		const answer = Answer.create({
			...data,
			authorId: new UniqueEntityId(data.instructionId),
			questionId: new UniqueEntityId(data.questionId),
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
