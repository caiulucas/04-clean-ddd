import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[];

	constructor() {
		this.items = [];
	}

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string) {
		return this.items.find((item) => item.slug?.value === slug) ?? null;
	}
}
