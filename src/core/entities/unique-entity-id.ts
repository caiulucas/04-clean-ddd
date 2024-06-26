import { randomUUID } from 'crypto';

export class UniqueEntityId {
	private value: string;

	constructor(value?: string) {
		this.value = value ?? randomUUID();
	}

	toString() {
		return this.value;
	}

	toValue() {
		return this.value;
	}

	public equals(id: UniqueEntityId): boolean {
		return id === this || this.value === id.value ? true : false;
	}
}
