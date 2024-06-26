import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
	AnswerAttachment,
	AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment';

export function makeAnswerAttachment(
	override?: Partial<AnswerAttachmentProps>,
	id?: UniqueEntityId,
): AnswerAttachment {
	return AnswerAttachment.create(
		{
			answerId: new UniqueEntityId(),
			attachmentId: new UniqueEntityId(),
			...override,
		},
		id,
	);
}
