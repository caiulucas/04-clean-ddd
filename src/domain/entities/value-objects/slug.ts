import { Entity } from '../../../core/entities/entity';

export class Slug {
	public value: string;

	constructor(value: string) {
		this.value = value;
	}

	/**
	 * Receives a text string and normalize it as a slug.
	 *
	 * @param text {string}
	 *
	 * @example "An example title" => "an-example-title"
	 */
	static createFromText(text: string) {
		const slugText = text
			.normalize('NFKC')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/_/g, '-')
			.replace(/--+/g, '-')
			.replace(/-$/, '');

		return new Slug(slugText);
	}
}
