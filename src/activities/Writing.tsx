import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
// component
import { Box } from '@components/Box';
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { Carousel } from '@components/Card/Carousel';

export const Writing: ActivityComponentType = () => {
    const uploadImage = [
        { src: '', fileName: '1' },
        { src: '', fileName: '2' },
        { src: '', fileName: '3' },
    ];

    return (
        <AppScreen sub>
            <Stack sx={{ width: '100%' }}>
                <SubTitle />
                <Stack>
                    <Box border>
                        <Box>
                            <Carousel upload images={uploadImage} />
                        </Box>
                        <Box border>dd</Box>
                        <Box border>ddd</Box>
                    </Box>
                </Stack>
            </Stack>
        </AppScreen>
    );
};
