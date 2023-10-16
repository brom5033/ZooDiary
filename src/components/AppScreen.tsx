import type { FC, PropsWithChildren } from 'react';
import { AppBar } from '@components/bar/AppBar';
import { MenuBar } from '@components/bar/MenuBar';
import { MyPageBar } from '@components/bar/MyPageBar';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container } from '@mui/material';

const style = {
    spacing: {
        paddingTop: '24px',
        height: 'calc(100vh - 30px)',
        display: 'flex',
    },
} as const;
interface Props extends PropsWithChildren {
    main?: boolean;
    sub?: boolean;
    page?: boolean;
}
export const AppScreen: FC<Props> = ({ children, main, sub, page }) => {
    return (
        <StackFlowAppScreen>
            {main && <MenuBar />}
            {sub && <AppBar />}
            {page && <MyPageBar />}
            <Container component="main" sx={style.spacing} maxWidth={false}>
                {children}
            </Container>
        </StackFlowAppScreen>
    );
};
