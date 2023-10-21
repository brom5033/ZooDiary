import { type ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';

// component
import { AppScreen } from '@components/AppScreen';
import { SubTitle } from '@components/SubTitle';
import { FileUpload } from '@components/FileUpload';
import { Box } from '@components/Box';

export const MyPage: ActivityComponentType = () => {
    return <AppScreen logout>
        <Stack>
        <SubTitle>마이페이지</SubTitle>

        </Stack>
    </AppScreen>;
};
