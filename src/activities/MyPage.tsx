import { useEffect, useRef, useState } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
import { useFlow } from 'stackflow';
// component
import { AppScreen, SubTitle, Hr, ProfileImage, Card, type Label } from '@components/index';
import { useGetMyPost, useLocalStorage } from '@hooks/index';
import { formatDate } from '@utils/index';
import { myPostModel } from '@stores/index';

const style = {
    stack: {
        width: '100%',
        height: 'min-content',
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

    // observer
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [isPageEnd, setIsPageEnd] = useState<boolean>(true);
    const [page, setPage] = useState(1);

    const { replace } = useFlow();

    useEffect(() => {
        if (!token()) {
            replace('Login', {});
        }

        useGetMyPost().then((response) => {
            myPostModelStore.setPost(response.data);
            setIsPageEnd(false);
        });
    }, []);

    const handleObserver = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            setIsPageEnd(true);

            await useGetMyPost(page * 10, page * 10 + 10).then((response) => {
                if (response.data.length === 0) {
                    setIsPageEnd(true);
                    return;
                }
                const responseArray = response.data.slice(0, 9);

                myPostModelStore.setPost(myPostModelStore.getPost().concat(responseArray));
                setPage(page + 1);

                if (response.data.length !== 0) {
                    setIsPageEnd(false);
                }
            });
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        const option = {
            root: null,
            rootMagin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver(handleObserver, option);

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [handleObserver, isPageEnd]);

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
                            profileImage={`http://api.zoodiary.kro.kr:3000${el.user.picture}`}
                        />
                    );
                })}
                <div>{!isPageEnd && <div ref={loadMoreRef} />}</div>
            </Stack>
        </AppScreen>
    );
};
