import { UpdateExcerciseOptionRequest } from './../types/excercise';
import { AddOptionRequest, CreateExcerciseRequest, CreateUserAttemptRequest, ExcerciseDto, GetPagedExcerciseTypesRequest, UpdateExcerciseRequest } from '@/types/excercise'
import { IPaginate } from '@/types/general'
import { create } from 'zustand'

interface ExcerciseStore {
    excercise: ExcerciseDto | null
    excercises: IPaginate<ExcerciseDto> | null
    getExcercise: (id: string) => Promise<void>
    getExcercises: (subTopicId: string, query: GetPagedExcerciseTypesRequest) => Promise<void>
    bulkExcercise: (id: string[]) => Promise<void>
    createExcercise: (request: CreateExcerciseRequest) => Promise<void>
    updateExcercise: (request: UpdateExcerciseRequest) => Promise<void>
    deleteExcercise: (id: string) => Promise<void>
    attemptExcercise: (request: CreateUserAttemptRequest) => Promise<void>
    createExcerciseOption: (request: AddOptionRequest) => Promise<void>
    updateExcerciseOption: (request: UpdateExcerciseOptionRequest) => Promise<void>
}

const useExcerciseStore = create<ExcerciseStore>((set) => (
    {
        excercise: null,
        excercises: null,
        getExcercise: async (id: string) => { },
        getExcercises: async (subTopicId: string, query: GetPagedExcerciseTypesRequest) => { },
        bulkExcercise: async (id: string[]) => { },
        createExcercise: async (request: CreateExcerciseRequest) => { },
        updateExcercise: async (request: UpdateExcerciseRequest) => { },
        deleteExcercise: async (id: string) => { },
        attemptExcercise: async (request: CreateUserAttemptRequest) => { },
        createExcerciseOption: async (request: AddOptionRequest) => { },
        updateExcerciseOption: async (request: UpdateExcerciseOptionRequest) => { }
    }
));

export default useExcerciseStore