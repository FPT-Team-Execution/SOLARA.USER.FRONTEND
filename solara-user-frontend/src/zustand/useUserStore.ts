import { AUTH_CLERK_API } from '@/constants/apis';
import { IBaseModel } from '@/interfaces/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';
import { setCookie } from 'cookies-next';

interface UserStore {
    authenticated: boolean
    setAuthenticated: (token: string) => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
    authenticated: false,
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

    }
}))

export default useUserStore;