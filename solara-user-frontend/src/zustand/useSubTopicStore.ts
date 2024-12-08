import { GET_SUBTOPIC_API, GET_SUBTOPICS_API, POST_COMPLETION_SUBTOPIC_API, POST_SUBTOPIC_API, PUT_SUBTOPIC_API } from '@/constants/apis'
import { IBaseModel, IPaginate } from '@/types/general'
import { CreateSubTopicRequest, GetPagedSubTopicRequest, SubTopicDto, UpdateSubTopicRequest } from '@/types/subTopic'
import axiosClient from '@/utils/axios/axiosClient'
import { create } from 'zustand'

interface SubTopicStore {
    subTopic: SubTopicDto | null
    subTopics: IPaginate<SubTopicDto> | null
    getSubTopics: (subTopicId: string, query: GetPagedSubTopicRequest) => Promise<void>
    getSubTopic: (id: string) => Promise<void>
    createSubTopic: (request: CreateSubTopicRequest) => Promise<void>
    updateSubTopic: (request: UpdateSubTopicRequest) => Promise<void>
    completeSubTopic: (id: string) => Promise<void>
}

const useSubTopicStore = create<SubTopicStore>((set) => ({
    subTopic: null,
    subTopics: null,

    getSubTopics: async (subTopicId: string, query: GetPagedSubTopicRequest) => {
        try {

            const response = await axiosClient.get<IBaseModel<IPaginate<SubTopicDto>>>(GET_SUBTOPICS_API(subTopicId), { params: query })

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                subTopics: response.data.responseRequest
            }))

        } catch (error) {
            console.log('Error fetching sub topics', error)
        }
    },

    getSubTopic: async (id: string) => {
        try {
            const response = await axiosClient.get<IBaseModel<SubTopicDto>>(GET_SUBTOPIC_API(id));

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                subTopic: response.data.responseRequest
            }))

        } catch (error) {
            console.log('Error fetching sub topic', error)
        }
    },

    createSubTopic: async (request: CreateSubTopicRequest) => {
        try {
            const createResponse = await axiosClient.post<IBaseModel<string>>(POST_SUBTOPIC_API, request)
            const subTopicId = createResponse.data.responseRequest
            const getResponse = await axiosClient.get<IBaseModel<SubTopicDto>>(GET_SUBTOPIC_API(subTopicId!))
            const subTopic = getResponse.data.responseRequest

            if (subTopic) {
                set((state) => {
                    const updateSubTopic = state.subTopics ?
                        {
                            ...state.subTopics,
                            items: [...state.subTopics.items, subTopic],
                            total: state.subTopics.total + 1,
                            totalPage: Math.ceil((state.subTopics.total + 1) / state.subTopics.size)

                        }
                        :
                        {
                            items: [subTopic],
                            size: 1,
                            page: 1,
                            total: 1,
                            totalPages: 1
                        }

                    return { subTopics: updateSubTopic }
                })
            }

        } catch (error) {
            console.log('Error creating sub topic', error)
        }
    },

    updateSubTopic: async (request: UpdateSubTopicRequest) => {
        try {
            const response = await axiosClient.put<IBaseModel<SubTopicDto>>(PUT_SUBTOPIC_API, request)

            if (!response.data.isSuccess) {
                return
            }

            set((state) => {
                if (!state.subTopics) {
                    return {
                        subTopics: state.subTopics
                    }
                }

                const updatedSubTopics = state.subTopics.items.map(
                    (subTopic) => subTopic.id === response.data.responseRequest?.id
                        ?
                        {
                            ...subTopic,
                            ...response.data.responseRequest
                        }
                        :
                        subTopic
                );

                return {
                    subTopics: {
                        ...state.subTopics,
                        items: updatedSubTopics
                    }
                }

            })

        } catch (error) {
            console.log('Error updating sub topic', error)
        }
    },

    completeSubTopic: async (id: string) => {
        try {
            const response = await axiosClient.post<IBaseModel<string>>(POST_COMPLETION_SUBTOPIC_API(id))

            if (!response.data.isSuccess) {
                throw new Error()
            }

        } catch (error) {
            console.log('Error completing sub topic', error);
        }
    }

}))

export default useSubTopicStore;