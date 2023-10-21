import { useEffect } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Stack } from '@mui/material';
import { useFlow } from 'stackflow';
// component
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { Hr } from '@components/Hr';
import { Card } from '@components/Card';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from '@components/Button';


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
// TODO:utils로 옮기기
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
    box: {
        width: '60px',
        position: 'absolute',
        bottom: '20px',
        right: '20px',
    },
    iconColor: {
        color: '#353537',
    },
} as const;

export const Board: ActivityComponentType = () => {
    const [token] = useLocalStorage('token');

    const { push, replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }
    }, []);

    const gotoWriting = () => push('Writing', {});

    const lastPost = response[0];

    const id = 'idd';
    return (
        <AppScreen page>
            <Stack sx={style.stack} gap="60px">
                <Stack>
                    <SubTitle marginZero>{formatDate(lastPost.createdAt)}</SubTitle>
                    <Hr />
                </Stack>
                <Card title={id} labels={['기분좋아']} bodyText={id} clickNumber={11} time={lastPost.createdAt} />
                <Card title={id} labels={['기분좋아']} bodyText={id} clickNumber={11} time={lastPost.createdAt} />
                <div style={style.box}>
                    <Button border onClick={gotoWriting}>
                        <EditNoteIcon sx={style.iconColor} />
                    </Button>
                </div>
            </Stack>
        </AppScreen>
    );
};
