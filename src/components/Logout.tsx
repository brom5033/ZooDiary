import React, { type FC } from 'react';
import { IconButton } from '@mui/material';
//component
import { OverlayMenu } from '@components/OverlayMenu';
import { Button } from '@components/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const style = {
    button: {
        position: 'absolute',
        top: '7px',
        right: '12px',
    },
} as const;

export const Logout: FC = () => {
    return (
        <IconButton aria-label="로그아웃" sx={style.button}>
            <OverlayMenu action={<LogoutIcon />}>
                <Button danger>로그아웃</Button>
                <Button outlined>취소</Button>
            </OverlayMenu>
        </IconButton>
    );
};
