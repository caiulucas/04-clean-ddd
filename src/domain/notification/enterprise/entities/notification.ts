import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';

type NotificationProps = {
	recipientId: string;
	title: string;
	content: string;
	createdAt: Date;
	readAt?: Date;
};

export class Notification extends Entity<NotificationProps> {
	static create(props: Optional<NotificationProps, 'createdAt'>) {
		return new Notification({
			...props,
			createdAt: props.createdAt ?? new Date(),
		});
	}

	get recipientId() {
		return this.props.recipientId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get readAt() {
		return this.props.readAt;
	}
}
