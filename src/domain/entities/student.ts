import { randomUUID } from 'crypto';

class Student {
	public id: string;
	public name: string;

	constructor(name: string) {
		this.id = randomUUID();
		this.name = name;
	}
}
