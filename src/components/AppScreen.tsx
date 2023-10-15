import React, { type FC, type PropsWithChildren } from 'react';
import { AppBar } from '@components/bar/AppBar';
import { MenuBar } from '@components/bar/MenuBar';
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
}
export const AppScreen: FC<Props> = ({ children, main, sub }) => {
    return (
        <StackFlowAppScreen>
            {main && <MenuBar />}
            {sub && <AppBar />}
            <Container component="main" sx={style.spacing} maxWidth={false}>
                {children}
            </Container>
        </StackFlowAppScreen>
    );
};
