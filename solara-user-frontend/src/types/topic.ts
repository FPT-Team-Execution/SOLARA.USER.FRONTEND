import { IPageRequest } from './general';

export type TopicDto = {
    topicId: string;
    createAt?: Date | null;
    description: string;
    topicName: string;
    totalSubTopic: number;
    createdOn?: Date | null;
    updatedOn?: Date | null;
}

export type GetPagedTopicsRequest = IPageRequest & {

}

export type UpdateTopicRequest = {
    topicId: string;
    topicName: string;
    topicDescription: string;
    totalSubTopic: number;
};

export type CreateTopicRequest = {
    topicName: string;
    topicDescription: string;
    totalSubTopic: number;
};