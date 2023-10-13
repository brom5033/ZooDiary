import React, { type FC, type ReactNode, type PropsWithChildren } from 'react';
import { AppBar } from '@components/bar/AppBar';
import { MenuBar } from '@components/bar/MenuBar';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container } from '@mui/material';

interface Props extends PropsWithChildren {
    main?: boolean;
    sub?: boolean;
}
export const AppScreen: FC<Props> = ({ children, main, sub }) => {

    return (
        <StackFlowAppScreen>
            {main && <MenuBar />}
            {sub && <AppBar />}
            <Container component="main">
                {children}
            </Container>
        </StackFlowAppScreen>
    );
};
