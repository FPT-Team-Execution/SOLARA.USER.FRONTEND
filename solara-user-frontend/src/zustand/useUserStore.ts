import { AUTH_CLERK_API, GET_USER_LEVEL } from '@/constants/apis';
import { IBaseModel } from '@/interfaces/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';
import { getCookie, setCookie } from 'cookies-next';
import { UserLevelDto } from '@/types/level';

interface UserStore {
    authenticated: boolean,
    appUserId: string | null,
    level: UserLevelDto | null,
    setAuthenticated: (token: string) => Promise<void>,
    getUserLevel: () => Promise<void>,
}

const useUserStore = create<UserStore>((set) => ({
    authenticated: false,
    level: null,
    appUserId: null,

    setAuthenticated: async (token: string) => {

        try {
            const response = await axiosClient.post<IBaseModel<string>>(AUTH_CLERK_API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
                appUserId: response.data.responseRequest
            }));

        } catch {

        }

    },

    getUserLevel: async () => {
        try {

            const appUserId = getCookie('__appUserId')

            const response = await axiosClient.get<IBaseModel<UserLevelDto>>(GET_USER_LEVEL(appUserId as string))

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                level: response.data.responseRequest
            }))

        } catch {

        }
    },
}))

export default useUserStore;