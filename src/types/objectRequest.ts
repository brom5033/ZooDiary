interface User {
    user: {
        nickName: string;
        picture?: string;
    };
}

interface Heart {
    user: {
        createdAt: string;
        nickName: string;
        picture?: string;
    };
}

export interface PostApi extends User {
    Heart: Heart[];
    chips?: string;
    content: string;
    createdAt: string;
    deletedAt?: string;
    id: number;
    picture?: string;
    updateAt: string;
    userId: number;
}
