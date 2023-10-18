import { create } from 'zustand';

interface Image {
    src: string;
    fileName: string;
}

interface ImageModel {
    data: Image[];
    getImage: () => Image[] | undefined;
    setImage: (index: number, src: string, fileName: string) => void;
}

export const ImageModel = create<ImageModel>((set, get) => ({
    data: [
        { src: '', fileName: '1' },
        { src: '', fileName: '2' },
        { src: '', fileName: '3' },
    ],

    getImage() {
        return get().data;
    },

    setImage(index, src, fileName) {
        if (get().data[index].src === src && get().data[index].fileName === fileName) {
            return;
        }

        const newData = [...get().data];
        newData[index] = { src, fileName };

        set({ data: newData });
    },

    emptyUser: () => set({ data: undefined }),
}));
