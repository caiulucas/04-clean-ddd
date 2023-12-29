import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

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
}
