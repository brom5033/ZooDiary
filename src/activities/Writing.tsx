import { useState, type ChangeEvent } from 'react';
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

    const uploadImage = [
        { src: '', fileName: '1' },
        { src: '', fileName: '2' },
        { src: '', fileName: '3' },
    ];

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
                                <Carousel upload images={uploadImage} />
                            </Box>
                            <Stack>
                                <Box border noGutter sx={style.outer}>
                                    <Grid container sx={style.inner}>
                                        <Grid item xs={4} sx={style.chipNoLeft}>
                                            <Chip color="hotpink" label="기분좋아" />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip color="blue" label="평범해" />
                                        </Grid>
                                        <Grid item xs={4} sx={style.chip}>
                                            <Chip color="purple" label="기분나빠" />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box border noGutter sx={style.outer}>
                                    <Grid container sx={style.inner}>
                                        <Grid item xs={6} sx={style.chipNoLeft}>
                                            <Chip color="orange" label="산책 다녀왔어" />
                                        </Grid>
                                        <Grid item xs={6} sx={style.chip}>
                                            <Chip color="pink" label="간식 먹었어" />
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
