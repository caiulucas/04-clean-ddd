import { randomUUID } from 'crypto';

class Question {
	public id: string;
	public title: string;
	public content: string;

	constructor(title: string, content: string) {
		this.id = randomUUID();
		this.title = title;
		this.content = content;
	}
}
