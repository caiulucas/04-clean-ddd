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
}
