import { useEffect, useState, useRef } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Stack } from '@mui/material';
import { useFlow } from 'stackflow';
import EditNoteIcon from '@mui/icons-material/EditNote';
// component
import { AppScreen, SubTitle, Hr, Button } from '@components/index';
import { Card, type Label } from '@components/Card';
import { useGetPost } from '@hooks/api/useGetPost';
import { formatDate } from '@utils/date';
import { postModel } from '@stores/post';

const style = {
    stack: {
        width: '100%',
        maxWidth: '1000px',
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
} as const;

export const Board: ActivityComponentType = () => {
    const [token] = useLocalStorage('token');
    const postModelStore = postModel();
    const post = postModelStore.getPost();
    // observer
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [isPageEnd, setIsPageEnd] = useState<boolean>(true);
    const [page, setPage] = useState(1);

    const { push, replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }

        useGetPost().then((response) => {
            postModelStore.setPost(response.data.data);
            setIsPageEnd(false);
        });
    }, []);

    const gotoWriting = () => push('Writing', { postId: '' });

    const handleObserver = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            setIsPageEnd(true);

            await useGetPost(page * 10, page * 10 + 10).then((response) => {
                if (response.data.data.length === 0) {
                    setIsPageEnd(true);
                    return;
                }
                const responseArray = response.data.data.slice(0, 9);

                postModelStore.setPost(postModelStore.getPost().concat(responseArray));
                setPage(page + 1);

                if (response.data.data.length !== 0) {
                    setIsPageEnd(false);
                }
            });
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const option = {
            root: null,
            rootMagin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver(handleObserver, option);

        // eslint-disable-next-line no-unused-expressions
        loadMoreRef.current && observer.observe(loadMoreRef.current);

        // eslint-disable-next-line consistent-return
        return () => observer && observer.disconnect();
    }, [handleObserver, isPageEnd]);

    return (
        <AppScreen page>
            <Stack sx={style.stack} gap="60px">
                <Stack>
                    <SubTitle marginZero>{formatDate(post?.[0]?.createdAt as string)}</SubTitle>
                    <Hr />
                </Stack>
                {postModelStore.getPost()?.map((el) => {
                    return (
                        <Card
                            key={`card-${el.id}`}
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
                <div>{!isPageEnd && <div ref={loadMoreRef} />}</div>
                <div style={style.box}>
                    <Button border onClick={gotoWriting}>
                        <EditNoteIcon sx={style.iconColor} />
                    </Button>
                </div>
            </Stack>
        </AppScreen>
    );
};
