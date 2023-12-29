import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

export interface QuestionsRepository {
	create(question: Question): Promise<void>;
	save(question: Question): Promise<void>;
	delete(question: Question): Promise<void>;
	findById(id: string): Promise<Question | null>;
	findBySlug(slug: string): Promise<Question | null>;
}
