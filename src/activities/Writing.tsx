import { useState, type ChangeEvent, useEffect } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack, Grid } from '@mui/material';
import { useFlow } from 'stackflow';
// component
import { Box, AppScreen, SubTitle, Input, Button, Chip } from '@components/index';
import { Carousel } from '@components/Card/Carousel';
import { usePostWrite, useGetPost, useUpdatePost } from '@hooks/index';
import { ImageModel, postModel } from '@stores/index';

const style = {
    chip: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '6px',
    },
    outer: {
        height: '40px',
        padding: 0,
    },
    inner: {
        textAlign: 'center',
        height: '100%',
        padding: '6px',
    },
    chipNoLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
} as const;

interface Props {
    postId: string;
}

export const Writing: ActivityComponentType<Props> = ({ params }) => {
    const { pop } = useFlow();
    const postModelStore = postModel();
    const [texted, setTexted] = useState<string>();
    const [feel, setFeel] = useState<string>();
    const [job, setJob] = useState({
        food: false,
        walking: false,
    });
    const ImageModelStore = ImageModel();
    const isEditMode = params.postId !== '';

    useEffect(() => {
        ImageModelStore.emptyImage();
        if (isEditMode) {
            const post = postModelStore.getPost().filter((post) => parseInt(params.postId, 10) === post.id)[0];

            post?.picture
                ?.split(',')
                .filter((src) => src)
                .forEach((src, index) => {
                    const splitSrc = src.split('/');
                    const fileName = splitSrc[splitSrc.length - 1];

                    ImageModelStore.setImage(index, src, fileName);
                });

            setTexted(post.content);

            const splitChips = post?.chips?.split(',');
            const feelData = splitChips?.filter(
                (str) => str === '기분좋아' || str === '평범해' || str === '기분나빠',
            )[0];

            if (splitChips?.includes('산책 다녀왔어')) {
                setJob({
                    ...job,
                    walking: true,
                });
            }

            if (splitChips?.includes('간식 먹었어')) {
                setJob({
                    ...job,
                    food: true,
                });
            }

            setFeel(feelData);
        }
    }, []);

    const handleFeelClick = (label: string) => () => {
        setFeel(label);
    };

    const handleJobClick = (label: '산책 다녀왔어' | '간식 먹었어') => () => {
        if (label === '산책 다녀왔어') {
            setJob({
                ...job,
                walking: !job.walking,
            });
        } else {
            setJob({
                ...job,
                food: !job.food,
            });
        }
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTexted(event.target.value);
    };

    const upLoad = () => {
        const picture = ImageModelStore.getImage()
            ?.map(({ src }) => src)
            .filter((src) => src)
            .join(',') as string;
        const content = texted as string;
        const chips = [feel, job.food ? '간식 먹었어' : null, job.walking ? '산책 다녀왔어' : null]
            .filter((element) => element)
            .join(',');

        if (isEditMode) {
            useUpdatePost(parseInt(params.postId, 10), content, picture, chips).then(() => {
                useGetPost().then((response) => {
                    postModelStore.setPost(response.data);
                    pop();
                });
            });
        } else {
            usePostWrite(picture, content, chips).then(() => {
                useGetPost().then((response) => {
                    postModelStore.setPost(response.data);
                    pop();
                });
            });
        }
    };

    return (
        <AppScreen sub>
            <Stack sx={{ width: '100%' }} gap="30px">
                <SubTitle>{isEditMode ? '수정하기' : '글쓰기'}</SubTitle>
                <Stack gap="12px">
                    <Box border>
                        <Stack gap="24px">
                            <Box>
                                <Carousel upload images={[...(ImageModelStore.getImage() ?? [])]} />
                            </Box>
                            <Stack>
                                <Box border noGutter sx={style.outer}>
                                    <Grid container sx={style.inner}>
                                        <Grid item xs={4} sx={style.chipNoLeft}>
                                            <Chip
                                                color="hotpink"
                                                label="기분좋아"
                                                onClick={handleFeelClick('기분좋아')}
                                                active={feel === '기분좋아'}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip
                                                color="blue"
                                                label="평범해"
                                                onClick={handleFeelClick('평범해')}
                                                active={feel === '평범해'}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip
                                                color="purple"
                                                label="기분나빠"
                                                onClick={handleFeelClick('기분나빠')}
                                                active={feel === '기분나빠'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box border noGutter sx={style.outer}>
                                    <Grid container sx={style.inner}>
                                        <Grid item xs={6} sx={style.chipNoLeft}>
                                            <Chip
                                                color="orange"
                                                label="산책 다녀왔어"
                                                onClick={handleJobClick('산책 다녀왔어')}
                                                active={job.walking}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sx={style.chip}>
                                            <Chip
                                                color="pink"
                                                label="간식 먹었어"
                                                onClick={handleJobClick('간식 먹었어')}
                                                active={job.food}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                    <Input
                        multiline
                        border
                        type="text"
                        label="일기"
                        onChange={handleTextChange}
                        value={texted}
                        maxLength={250}
                    />
                    <div style={{ width: '100%', textAlign: 'right' }}>{texted?.length ?? 0}/250</div>
                </Stack>
                <Button border onClick={upLoad}>
                    {isEditMode ? '수정하기' : '작성하기'}
                </Button>
            </Stack>
        </AppScreen>
    );
};
