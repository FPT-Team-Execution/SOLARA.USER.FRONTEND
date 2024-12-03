import { IPageRequest } from "./general";

export type ExerciseTypeDto = {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
    minOptions: number;
    maxOptions?: number;
    isMultipleChoice: boolean;
};

export type GetPagedTypesRequest = IPageRequest & {

}

export type UpdateTypeRequest = {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
    maxOptions?: number;
    isMultipleChoice: boolean;
};

export type CreateTypeRequest = {
    name: string;
    description: string;
    externalLink?: string;
    maxOptions?: number;
    isMultipleChoice: boolean;
};