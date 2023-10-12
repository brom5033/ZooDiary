import React, { type FC, type ReactNode, type PropsWithChildren } from 'react';
import { AppBar } from '@components/molecules/AppBar';
import { MenuBar } from '@components/molecules/MenuBar';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container } from '@mui/material';

interface Props extends PropsWithChildren {
    main?: boolean;
    sub?: boolean;
}
export const AppScreen: FC<Props> = ({ children, main, sub }) => {
    const style = {
        container: {
            color: 'red',
        },
    } as const;

    return (
        <StackFlowAppScreen>
            {main && <MenuBar />}
            {sub && <AppBar />}
            <Container component="main" sx={style.container}>
                {children}
            </Container>
        </StackFlowAppScreen>
    );
};
