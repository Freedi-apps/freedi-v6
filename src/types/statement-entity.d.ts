export type Statement = {
	uid: string;
	statementType: StatementType;
	parentUid: string;
	topParentUid: string;
	parentsUid: string[];
	resultsUid: string[];
}

export enum StatementType {
	None,
	Question,
	Suggestion,
}