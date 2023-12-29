import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

export interface QuestionsRepository {
	create(question: Question): Promise<void>;
	findBySlug(slug: string): Promise<Question | null>;
}
