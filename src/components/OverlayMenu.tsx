import { type FC, type PropsWithChildren, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { Stack, Drawer } from '@mui/material';

interface Props extends PropsWithChildren {
    action: ReactNode;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const OverlayMenu: FC<Props> = ({ children, action, open, setOpen }) => {
    const toggleOpen = () => setOpen?.((prev) => !prev);
    return (
        <>
            <div onClick={toggleOpen}>{action}</div>
            <Drawer anchor="bottom" open={open} onClose={toggleOpen}>
                <Stack>{children}</Stack>
            </Drawer>
        </>
    );
};
