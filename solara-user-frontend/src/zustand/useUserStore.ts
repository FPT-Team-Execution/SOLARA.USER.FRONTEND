import { AUTH_CLERK_API, GET_USER_API, GET_USER_LEVEL_API, GET_USER_SUBSCRIPTIONS } from '@/constants/apis';
import { IBaseModel, IPaginate } from '@/interfaces/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';
import { getCookie, setCookie } from 'cookies-next';
import { UserLevelDto } from '@/types/userLevel';
import { GetUserSubscriptionsRequest, UserSubscription } from '@/types/userSubscription';
import { User } from '@/types/user';

interface UserStore {
    loading: boolean,
    authenticated: boolean,
    appUserId: string | null,
    userLevel: UserLevelDto | null,
    userSubcriptions: UserSubscription[] | null,
    user: User | null,

    getUserSubsctiptions: () => Promise<void>,
    setAuthenticated: () => Promise<void>,
    getUserLevel: () => Promise<void>,
    getUser: () => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
    loading: false,
    authenticated: false,
    userLevel: null,
    appUserId: null,
    userSubcriptions: null,
    user: null,

    getUser: async () => {
        try {
            const response = await axiosClient.get<IBaseModel<User>>(GET_USER_API(getCookie('__appUserId') as string));

            set((state) => ({
                ...state,
                user: response.data.responseRequest
            }))
            
        } catch {

        }
    },

    getUserSubsctiptions: async () => {
        try {
            const request: GetUserSubscriptionsRequest = {
                userId: getCookie('__appUserId') as string,
                searchProp: '',
                isAscending: true,
                page: 1,
                size: 100,
                orderOn: '',
                searchKey: ''
            }
            const response = await axiosClient.get<IBaseModel<IPaginate<UserSubscription>>>(GET_USER_SUBSCRIPTIONS, { params: request })

            set((state) => ({
                ...state,
                userSubcriptions: response.data.responseRequest?.items.reverse()
            }));

        } catch {

        }
    },

    setAuthenticated: async () => {
        set((state) => ({
            ...state,
            loading: true,
        }))

        try {
            const response = await axiosClient.post<IBaseModel<string>>(AUTH_CLERK_API);

            if (!response.data.isSuccess) {
                set((state) => ({
                    ...state,
                    authenticated: false,
                }));
                return;
            }

            setCookie('__appUserId', response.data.responseRequest);

            set((state) => ({
                ...state,
                authenticated: true,
                appUserId: response.data.responseRequest,
                loading: false
            }));

        } catch {

        }

    },

    getUserLevel: async () => {
        try {

            set((state) => ({
                ...state,
                loading: true,
            }))

            const appUserId = getCookie('__appUserId')

            const response = await axiosClient.get<IBaseModel<UserLevelDto>>(GET_USER_LEVEL_API(appUserId as string))

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                userLevel: response.data.responseRequest,
                loading: false
            }))

        } catch {

        }
    },
}))

export default useUserStore;