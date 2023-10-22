import { useEffect, useState } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Stack } from '@mui/material';
import { useFlow } from 'stackflow';
import EditNoteIcon from '@mui/icons-material/EditNote';
// component
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { Hr } from '@components/Hr';
import { Card, type Label } from '@components/Card';
import { Button } from '@components/Button';
import { useGetPost } from '@hooks/api/useGetPost';
import type { PostApi } from '@customType/objectRequest';
import { formatDate } from '@utils/date';

const style = {
    stack: {
        width: '100%',
        height: 'min-content'
    },
    box: {
        width: '60px',
        position: 'sticky',
        bottom: '20px',
        marginLeft: 'auto',
        zIndex:1000,
    },
    iconColor: {
        color: '#353537',
    },
} as const;

export const Board: ActivityComponentType = () => {
    const [token] = useLocalStorage('token');
    const [post, setPost] = useState<PostApi[]>();

    const { push, replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }

        useGetPost().then((response) => {
            console.info(response.data.data);
            setPost(response.data.data);
        });
    }, []);

    const gotoWriting = () => push('Writing', {});

    return (
        <AppScreen page>
            <Stack sx={style.stack} gap="60px">
                <Stack>
                    <SubTitle marginZero>{formatDate(post?.[0].createdAt as string)}</SubTitle>
                    <Hr />
                </Stack>
                {post?.map((el) => {
                    return (
                        <Card
                            key={el.id}
                            title={el.user.nickName}
                            images={el.picture
                                ?.split(',')
                                .filter((el) => el)
                                .map((el) => {
                                    const srcSplit = el.split('/');
                                    return {
                                        src: el,
                                        fileName: srcSplit[srcSplit.length - 1],
                                    };
                                })}
                            labels={el.chips?.split(',').filter((el) => el) as unknown as Label[]}
                            bodyText={el.content}
                            clickNumber={11}
                            time={el.createdAt}
                        />
                    );
                })}
                <div style={style.box}>
                    <Button border onClick={gotoWriting}>
                        <EditNoteIcon sx={style.iconColor} />
                    </Button>
                </div>
            </Stack>
        </AppScreen>
    );
};
