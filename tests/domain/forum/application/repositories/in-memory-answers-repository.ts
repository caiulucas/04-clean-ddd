import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

const PAGE_SIZE = 20;

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[];

	constructor() {
		this.items = [];
	}

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async save(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[itemIndex] = answer;
	}

	async delete(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(itemIndex, 1);
	}

	async findById(id: string) {
		return this.items.find((item) => item.id.toValue() === id) ?? null;
	}

	async findManyByQuestionId(id: string, params: PaginationParams) {
		return (
			this.items.filter((item) => item.questionId.toValue() === id) ?? null
		).slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE);
	}
}
