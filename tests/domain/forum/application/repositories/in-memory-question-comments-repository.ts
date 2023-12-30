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

	async delete(questionComment: QuestionComment) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === questionComment.id,
		);

		this.items.splice(itemIndex, 1);
	}

	async findById(id: string): Promise<QuestionComment | null> {
		return this.items.find((item) => item.id.toValue() === id) ?? null;
	}
}
