import { useEffect } from 'react';
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
import { useGetMyPost } from '@hooks/api/useGetMyPost';
import { formatDate } from '@utils/date';
import { ProfileImage } from '@components/ProfileImage';
import { myPostModel } from '@stores/myPost';

const style = {
    stack: {
        width: '100%',
        height: 'min-content',
    },
    box: {
        width: '60px',
        position: 'sticky',
        bottom: '20px',
        marginLeft: 'auto',
        zIndex: 1000,
    },
    iconColor: {
        color: '#353537',
    },
    imageWrap: {
        alignItems: 'center',
        textAlign: 'center',
        width: '160px',
        margin: 'auto',
    },
} as const;

export const MyPage: ActivityComponentType = () => {
    const [token] = useLocalStorage('token');
    const myPostModelStore = myPostModel();
    const post = myPostModelStore.getPost();

    const { push, replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }

        useGetMyPost().then((response) => {
            myPostModelStore.setPost(response.data.data);
        });
    }, []);

    const gotoWriting = () => push('Writing', { postId: '' });

    return (
        <AppScreen logout>
            <Stack sx={style.stack} gap="30px">
                <Stack>
                    <SubTitle>마이페이지</SubTitle>
                </Stack>
                <Stack sx={style.imageWrap}>
                    <ProfileImage />
                </Stack>
                <Stack>
                    <SubTitle marginZero>{formatDate(post?.[0]?.createdAt as string)}</SubTitle>
                    <Hr />
                </Stack>
                {post?.map((el) => {
                    return (
                        <Card
                            key={el.id}
                            id={el.id}
                            title={el.user.nickName}
                            images={el.picture
                                ?.split(',')
                                .filter((imageSrc) => imageSrc)
                                .map((imageSrc) => {
                                    const srcSplit = imageSrc.split('/');
                                    return {
                                        src: imageSrc,
                                        fileName: srcSplit[srcSplit.length - 1],
                                    };
                                })}
                            labels={el.chips?.split(',').filter((el) => el) as unknown as Label[]}
                            bodyText={el.content}
                            heart={el.Heart}
                            time={el.createdAt}
                            profileImage={`http://localhost:3000${el.user.picture}`}
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
