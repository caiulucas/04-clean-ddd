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
}
