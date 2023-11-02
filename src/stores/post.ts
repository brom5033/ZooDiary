import { create } from 'zustand';
import type { PostApi } from '@customType/index';

interface PostModel {
    data: PostApi[];
    getPost: () => PostApi[];
    setPost: (newData: PostApi[]) => void;
    emptyPost: () => void;
}

export const postModel = create<PostModel>((set, get) => ({
    data: [],

    getPost() {
        return get().data;
    },

    setPost(newData) {
        set({ data: newData });
    },

    emptyPost: () =>
        set({
            data: [],
        }),
}));
