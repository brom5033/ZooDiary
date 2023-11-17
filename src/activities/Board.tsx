import { useEffect, useState, useRef } from 'react';
import { type ActivityComponentType } from '@stackflow/react';
import { Stack, CircularProgress } from '@mui/material';
import { useFlow } from 'stackflow';
import { PullToRefresh } from 'react-js-pull-to-refresh';
// component
import { AppScreen, SubTitle, Hr, Card, type Label } from '@components/index';
import { useGetPost, useLocalStorage } from '@hooks/index';
import { formatDate } from '@utils/index';
import { postModel } from '@stores/index';

const style = {
    stack: {
        width: '100%',
        maxWidth: '1000px',
        height: 'min-content',
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

    const { replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }

        useGetPost().then((response) => {
            postModelStore.setPost(response.data.data);
            setIsPageEnd(false);
        });
    }, []);

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
        const option = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver(handleObserver, option);

        if (loadMoreRef?.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [handleObserver, isPageEnd]);

    const sleep = (ms: number) =>
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        });

    const handleRefresh = async () => {
        await sleep(1000);
        await useGetPost().then((response) => {
            postModelStore.setPost(response.data.data);
            setIsPageEnd(false);
        });
    };

    return (
        <AppScreen page>
            <PullToRefresh
                onRefresh={handleRefresh}
                pullDownContent={
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                }
                refreshContent={
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                }
                releaseContent={
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                }
                pullDownThreshold={50}
                triggerHeight="auto"
                backgroundColor="white"
                startInvisible
            >
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
                                profileImage={`http://api.zoodiary.kro.kr:3000${el.user.picture}`}
                            />
                        );
                    })}

                    <div>
                        {!isPageEnd && <div ref={loadMoreRef} />}
                        <br />
                    </div>
                </Stack>
            </PullToRefresh>
        </AppScreen>
    );
};
