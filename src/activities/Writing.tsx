import { useRef, useState } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
// component
import { Box } from '@components/Box';
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { Carousel } from '@components/Card/Carousel';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export const Writing: ActivityComponentType = () => {
    const textRef = useRef<HTMLInputElement>();
    const [texted, setTexted] = useState();

    const uploadImage = [
        { src: '', fileName: '1' },
        { src: '', fileName: '2' },
        { src: '', fileName: '3' },
    ];

    const textArea = () => {
        const text = textRef?.current?.value ?? '';
    };

    return (
        <AppScreen sub>
            <Stack sx={{ width: '100%' }} gap={'30px'}>
                <SubTitle />
                <Stack gap={'12px'}>
                    <Box border>
                        <Box>
                            <Carousel upload images={uploadImage} />
                        </Box>
                        <Box border>chips1</Box>
                        <Box border>chips2</Box>
                    </Box>
                    <Input multiline border type="text" label="일기" />
                </Stack>
                <Button border>작성하기</Button>
            </Stack>
        </AppScreen>
    );
};
