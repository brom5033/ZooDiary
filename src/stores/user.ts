import { create } from 'zustand';

interface User {
    user?: string;
    nickName?: string;
}

interface UserModel {
    data: User;
    getUser: () => User;
    setUser: (user: User['user'], nickName: User['nickName']) => void;
    emptyUser: () => void;
}

export const userModel = create<UserModel>((set, get) => ({
    data: {
        user: undefined,
        nickName: undefined,
    },

    getUser() {
        return get().data;
    },

    setUser(user, nickName) {
        if (get().data.user === user && get().data.nickName === nickName) {
            return;
        }

        set({
            data: {
                user,
                nickName,
            },
        });
    },

    emptyUser: () => set({ data: { user: undefined, nickName: undefined } }),
}));
