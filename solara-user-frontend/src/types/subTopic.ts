import { IPageRequest } from "../interfaces/general";

export type SubTopicDto = {
    id: string;
    name: string;
    description: string;
    totalXP: number;
    totalExcercise: number;
    createdOn?: Date;
    updatedOn?: Date;
};

export type GetPagedSubTopicRequest = IPageRequest & {

}

export type CreateSubTopicRequest = {
    subTopicId: string;
    topicId: string;
    name: string;
    description: string;
};

export type UpdateSubTopicRequest = {
    subTopicId: string;
    topicId: string;
    name: string;
    description: string;
};