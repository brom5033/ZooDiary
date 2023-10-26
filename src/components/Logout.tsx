import { type FC, useState } from 'react';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useFlow } from 'stackflow';
// component
import { OverlayMenu } from '@components/OverlayMenu';
import { Button } from '@components/Button';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { userModel } from '@stores/user';

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
