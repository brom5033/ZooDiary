import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { userModel } from '@stores/user';
import { Box } from '@components/Box';
import { Stack } from '@mui/material';

export const Board: ActivityComponentType = () => {
    const userModelStore = userModel();
    const [token] = useLocalStorage('token');
    return (
        <Box>
            <Stack>
                <div>token: {token()}</div>
                <div>user: {userModelStore.getUser().user}</div>
                <div>nickName: {userModelStore.getUser().nickName}</div>
            </Stack>
        </Box>
    );
};
