import { AUTH_CLERK_API } from '@/constants/apis';
import { IBaseModel } from '@/types/general';
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand';

interface SysAuthStore {
    authenticated: boolean
    setAuthenticated: () => void
}

const useSysAuthStore = create<SysAuthStore>((set) => ({
    authenticated: false,
    setAuthenticated: async () => {

        try {

            const response = await axiosClient.post<IBaseModel<string>>(AUTH_CLERK_API);

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

export default useSysAuthStore;