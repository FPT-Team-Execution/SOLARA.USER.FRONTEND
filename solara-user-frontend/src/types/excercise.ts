import { IPageRequest } from "./general";

export type AnswerDto = {
    id: string;
    optionText: string;
    explanation?: string;
    createOn?: Date;
};


export type ExcerciseDto = {
    id: string;
    difficulty: string;
    xp: number;
    imageUrl?: string;
    question?: string;
    videoUrl?: string;
    subTopicId: string;
    exerciseTypeId: string;
    exerciseTypeName: string;
    ans: AnswerDto[];
};

export type CreateExcerciseOptionRequest = {
    optionText: string;
    explanation?: string;
    isCorrect: boolean;
};

export type CreateExcerciseRequest = {
    subTopicId: string;
    xp: number;
    question: string;
    imageUrl?: string;
    videoUrl?: string;
    difficulty: string;
    exerciseTypeId: string;
    answers: CreateExcerciseOptionRequest[];
};

export type AddOptionRequest = {
    exerciseId: string;
    optionText: string;
    explanation?: string;
    isCorrect: boolean;
};

export type UpdateExcerciseRequest = {
    exerciseId: string;
    subTopicId: string;
    xp: number;
    question: string;
    imageUrl?: string;
    videoUrl?: string;
    difficulty: string;
};

export type UpdateExcerciseOptionRequest = {
    optionId: string;
    optionText: string;
    explanation?: string;
    isCorrect: boolean;
};

export type CreateUserAttemptRequest = {
    userId: string;
    exerciseId: string;
    options: string[];
};

export type ExcerciseTypeDto = {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
    minOptions: number;
    maxOptions?: number;
    isMultipleChoice: boolean;
};

export type GetPagedExcerciseTypesRequest = IPageRequest & {

}

export type UpdateExcerciseTypeRequest = {
    id: string;
    name: string;
    description: string;
    externalLink?: string;
    maxOptions?: number;
    isMultipleChoice: boolean;
};

export type CreateExcerciseTypeRequest = {
    name: string;
    description: string;
    externalLink?: string;
    maxOptions?: number;
    isMultipleChoice: boolean;
};