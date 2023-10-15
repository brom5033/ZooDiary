import React, { useState, useEffect } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { userModel } from '@stores/user';
import { Stack } from '@mui/material';
// component
import { AppScreen } from '@components/AppScreen';
import { Box } from '@components/Box';
import { SubTitle } from '@components/SubTitle';
import { Hr } from '@components/Hr';

import { Card } from '@components/Card';
// todo: appbar 마이페이지 아이콘 설정
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const response = [
    {
        id: 1,
        picture: 'https://placeholder.com/500x500,https://placeholder.com/500x500,https://placeholder.com/500x500',
        content: '오늘은 날씨가 좋았다',
        chip: '기분좋아,간식 먹었어',
        createdAt: '2023-10-15T21:12:16',
        user: 'test01',
        nickName: '몽몽',
    },
    {
        id: 2,
        picture: 'https://placeholder.com/500x500,https://placeholder.com/500x500,https://placeholder.com/500x500',
        content: '오늘은 산책을 갔다',
        chip: '기분좋아,간식 먹었어',
        createdAt: '2023-10-14T21:12:16',
        user: 'test01',
        nickName: '몽몽',
    },
];

interface Post {
    id: number;
    picture?: string;
    content: string;
    chip: string;
    createdAt: string;
    user: string;
    nickName: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}일`;
};

const style = {
    stack: {
        width: '100%',
    },
} as const;

export const Board: ActivityComponentType = () => {
    const userModelStore = userModel();
    const [token] = useLocalStorage('token');

    const lastPost = response[0];

    const id = 'idd';
    return (
        <AppScreen main>
            <Stack sx={style.stack} gap="60px">
                <Stack>
                    <SubTitle marginZero>{formatDate(lastPost.createdAt)}</SubTitle>
                    <Hr />
                </Stack>
                <Card title={id} labels={['기분좋아']} bodyText={id} clickNumber={11} time={lastPost.createdAt} />
                <Card title={id} labels={['기분좋아']} bodyText={id} clickNumber={11} time={lastPost.createdAt} />
            </Stack>
        </AppScreen>
    );
};
