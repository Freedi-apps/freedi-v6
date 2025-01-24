import { User } from "./user-entity";

export type Topic = {
	uid: string;
	topicType: Topic;
	topicName: string;
	topicDescription: string;
	createdAt: Date;
	creator: User;
}

export enum TopicType {
	None,
	Sign,
	MassConsensus,
	Stages,
	Simple,
	SubGroup
}