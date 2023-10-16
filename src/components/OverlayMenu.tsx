import { type FC, type PropsWithChildren, type ReactNode, useState } from 'react';
import { Stack, Drawer } from '@mui/material';

interface Props extends PropsWithChildren {
    action: ReactNode;
    open?: boolean;
}

export const OverlayMenu: FC<Props> = ({ children, action, open = false }) => {
    const [status, setStatus] = useState(open);
    const toggleOpen = () => setStatus(!status);

    return (
        <>
            <div onClick={toggleOpen}>{action}</div>
            <Drawer anchor="bottom" open={status} onClose={toggleOpen}>
                <Stack>{children}</Stack>
            </Drawer>
        </>
    );
};
