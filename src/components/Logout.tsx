import { type FC, useState } from 'react';
import { IconButton } from '@mui/material';
import {Logout as LogoutIcon} from '@mui/icons-material';
import { useFlow } from 'stackflow';
// component
import { OverlayMenu,Button } from '@components/index';
import { useLocalStorage } from '@hooks/index';
import { userModel } from '@stores/index';

const style = {
    button: {
        position: 'absolute',
        top: '7px',
        right: '12px',
    },
} as const;

export const Logout: FC = () => {
    const { replace } = useFlow();
    const [open, setOpen] = useState(false);
    const [, setToken] = useLocalStorage('token');

    const userModelStore = userModel();

    const logout = () => {
        setToken(null);
        userModelStore.emptyUser();
        setOpen(false);
        replace('Login', {});
    };

    return (
        <IconButton aria-label="로그아웃" sx={style.button}>
            <OverlayMenu action={<LogoutIcon />} open={open} setOpen={setOpen}>
                <Button danger onClick={logout}>
                    로그아웃
                </Button>
            </OverlayMenu>
        </IconButton>
    );
};
