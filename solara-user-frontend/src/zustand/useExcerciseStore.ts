/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_EXERCISE_API, GET_EXERCISES_API } from '@/constants/apis';
import { GetPagedExcercisesRequest, UpdateExcerciseOptionRequest } from './../types/excercise';
import { AddOptionRequest, CreateExcerciseRequest, CreateUserAttemptRequest, ExcerciseDto, GetPagedExcerciseTypesRequest, UpdateExcerciseRequest } from '@/types/excercise'
import { IBaseModel, IPaginate } from '@/interfaces/general'
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand'

interface ExcerciseStore {
    excercise: ExcerciseDto | null
    excercises: IPaginate<ExcerciseDto> | null
    getExcercise: (id: string) => Promise<void>
    getExcercises: (subTopicId: string, query: GetPagedExcercisesRequest) => Promise<void>
    bulkExcercise: (id: string[]) => Promise<void>
    createExcercise: (request: CreateExcerciseRequest) => Promise<void>
    updateExcercise: (request: UpdateExcerciseRequest) => Promise<void>
    deleteExcercise: (id: string) => Promise<void>
    attemptExcercise: (exerciseId: string, request: CreateUserAttemptRequest) => Promise<void>
    createExcerciseOption: (request: AddOptionRequest) => Promise<void>
    updateExcerciseOption: (request: UpdateExcerciseOptionRequest) => Promise<void>
}

const useExcerciseStore = create<ExcerciseStore>((set) => ({
    excercise: null,
    excercises: null,

    getExcercise: async (id: string) => {
        try {
            const response = await axiosClient.get<IBaseModel<ExcerciseDto>>(GET_EXERCISE_API(id))

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                excercise: response.data.responseRequest
            }))

        } catch {
        }

    },

    getExcercises: async (subTopicId: string, query: GetPagedExcercisesRequest) => {
        try {
            const response = await axiosClient.get<IBaseModel<IPaginate<ExcerciseDto>>>(GET_EXERCISES_API(subTopicId), { params: query })

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                excercises: response.data.responseRequest
            }))

        } catch {
        }
    },

    bulkExcercise: async (id: string[]) => { },
    createExcercise: async (request: CreateExcerciseRequest) => { },
    updateExcercise: async (request: UpdateExcerciseRequest) => { },
    deleteExcercise: async (id: string) => { },
    attemptExcercise: async (exerciseId: string, request: CreateUserAttemptRequest) => { },
    createExcerciseOption: async (request: AddOptionRequest) => { },
    updateExcerciseOption: async (request: UpdateExcerciseOptionRequest) => { }
}
));

export default useExcerciseStore