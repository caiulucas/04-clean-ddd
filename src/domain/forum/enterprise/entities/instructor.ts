import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface InstructorProps {
	name: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Instructor extends Entity<InstructorProps> {
	static create(props: InstructorProps, id?: UniqueEntityId) {
		return new Instructor(props, id);
	}
}