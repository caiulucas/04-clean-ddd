export interface AnswersRepository {
	create: (answer: Answer) => Promise<void>;
}
