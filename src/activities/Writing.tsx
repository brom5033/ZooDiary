import { useState, type ChangeEvent, useEffect } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack, Grid } from '@mui/material';
// component
import { Box } from '@components/Box';
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { Carousel } from '@components/Card/Carousel';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { usePostWrite } from '@hooks/api/usePostWrite';
import { Chip } from '@components/Chip';
import { ImageModel } from '@stores/image';

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

export const Writing: ActivityComponentType = () => {
    const [texted, setTexted] = useState<string>();
    const [feel, setFeel] = useState<string>();
    const [job, setJob] = useState({
        food: false,
        walking: false,
    });
    const ImageModelStore = ImageModel()

    useEffect(()=>{
        ImageModelStore.emptyImage()
    },[])

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

    return (
        <AppScreen sub>
            <Stack sx={{ width: '100%' }} gap={'30px'}>
                <SubTitle>글쓰기</SubTitle>
                <Stack gap="12px">
                    <Box border>
                        <Stack gap="24px">
                            <Box>
                                <Carousel upload images={ImageModelStore.getImage()} />
                            </Box>
                            <Stack>
                                <Box border noGutter sx={style.outer}>
                                    <Grid container sx={style.inner}>
                                        <Grid item xs={4} sx={style.chipNoLeft}>
                                            <Chip
                                                color="hotpink"
                                                label="기분좋아"
                                                onClick={handleFeelClick('기분좋아')}
                                                active={'기분좋아' === feel}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip
                                                color="blue"
                                                label="평범해"
                                                onClick={handleFeelClick('평범해')}
                                                active={'평범해' === feel}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip
                                                color="purple"
                                                label="기분나빠"
                                                onClick={handleFeelClick('기분나빠')}
                                                active={'기분나빠' === feel}
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
                    <Input multiline border type="text" label="일기" onChange={handleTextChange} maxLength={250} />
                    <div style={{ width: '100%', textAlign: 'right' }}>{texted?.length ?? 0}/250</div>
                </Stack>
                <Button border>작성하기</Button>
            </Stack>
        </AppScreen>
    );
};
