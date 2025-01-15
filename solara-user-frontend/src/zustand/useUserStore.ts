import { AUTH_CLERK_API, GET_USER_LEVEL_API } from '@/constants/apis';
import { IBaseModel } from '@/interfaces/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';
import { getCookie, setCookie } from 'cookies-next';
import { UserLevelDto } from '@/types/userLevel';

interface UserStore {
    loading: boolean,
    authenticated: boolean,
    appUserId: string | null,
    userLevel: UserLevelDto | null,
    setAuthenticated: () => Promise<void>,
    getUserLevel: () => Promise<void>,
}

const useUserStore = create<UserStore>((set) => ({
    loading: false,
    authenticated: false,
    userLevel: null,
    appUserId: null,

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