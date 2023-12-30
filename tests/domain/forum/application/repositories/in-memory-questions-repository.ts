import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

const PAGE_SIZE = 20;

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[];

	constructor() {
		this.items = [];
	}

	async create(question: Question) {
		this.items.push(question);
	}

	async save(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items[itemIndex] = question;
	}

	async delete(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(itemIndex, 1);
	}

	async findById(id: string) {
		return this.items.find((item) => item.id.toValue() === id) ?? null;
	}

	async findBySlug(slug: string) {
		return this.items.find((item) => item.slug?.value === slug) ?? null;
	}

	async findManyRecent(params: PaginationParams) {
		return this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE);
	}
}
