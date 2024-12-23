import { AUTH_CLERK_API } from '@/constants/apis';
import { IBaseModel } from '@/interfaces/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';

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

            set((state) => ({
                ...state,
                authenticated: true,
            }));

        } catch {

        }

    }
}))

export default useUserStore;