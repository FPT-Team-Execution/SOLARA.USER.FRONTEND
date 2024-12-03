export type AnswerDto = {
    id: string;
    optionText: string;
    explanation?: string;
    createOn?: Date;
};


export type ExerciseDto = {
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

export type CreateExerciseOptionRequest = {
    optionText: string;
    explanation?: string;
    isCorrect: boolean;
};

export type CreateExerciseRequest = {
    subTopicId: string;
    xp: number;
    question: string;
    imageUrl?: string;
    videoUrl?: string;
    difficulty: string;
    exerciseTypeId: string;
    answers: CreateExerciseOptionRequest[];
};

export type AddOptionRequest = {
    exerciseId: string;
    optionText: string;
    explanation?: string;
    isCorrect: boolean;
};

export type UpdateExerciseRequest = {
    exerciseId: string;
    subTopicId: string;
    xp: number;
    question: string;
    imageUrl?: string;
    videoUrl?: string;
    difficulty: string;
};

export type UpdateExerciseOptionRequest = {
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
