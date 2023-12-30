import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
	implements QuestionCommentsRepository
{
	public items: QuestionComment[];

	constructor() {
		this.items = [];
	}

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}
}
