export class Slug {
	private _value: string;

	constructor(value: string) {
		this._value = value;
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

	get value() {
		return this._value;
	}
}
