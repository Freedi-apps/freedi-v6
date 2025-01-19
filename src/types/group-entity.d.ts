export type Group ={
	uid: string;
	name: string;
	description: string;
	createdAt: number;
	membersUid: string[];
	topicsUid: string[];
}