import { randomUUID } from 'crypto';

interface QuestionProps {
	title: string;
	content: string;
	authorId: string;
}
export class Question {
	public id: string;
	public authorId: string;
	public title: string;
	public content: string;

	constructor(props: QuestionProps, id?: string) {
		this.id = id ?? randomUUID();
		this.authorId = props.authorId;
		this.title = props.title;
		this.content = props.content;
	}
}
