import { UniqueEntityId } from './unique-entity-id';

export abstract class Entity<T> {
	private _id: UniqueEntityId;

	protected props: T;

	protected constructor(props: T, id?: UniqueEntityId) {
		this.props = props;
		this._id = new UniqueEntityId(id?.toString());
	}

	get id() {
		return this._id;
	}
}
