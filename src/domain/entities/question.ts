import { randomUUID } from 'crypto';
import { Slug } from './value-objects/slug';
interface QuestionProps {
	title: string;
	content: string;
	slug: Slug;
	authorId: string;
}
export class Question {
	public id: string;
	public authorId: string;
	public title: string;
	public slug: Slug;
	public content: string;

	constructor(props: QuestionProps, id?: string) {
		this.id = id ?? randomUUID();
		this.authorId = props.authorId;
		this.title = props.title;
		this.content = props.content;
		this.slug = props.slug;
	}
}
