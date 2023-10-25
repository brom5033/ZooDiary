import type { FC, PropsWithChildren } from 'react';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container } from '@mui/material';
// component
import { AppBar } from '@components/bar/AppBar';
import { MenuBar } from '@components/bar/MenuBar';
import { MyPageBar } from '@components/bar/MyPageBar';
import { ButtonBar } from '@components/bar/ButtonBar';


const style = {
    spacing: {
        paddingTop: '24px',
        paddingBottom: '24px',
        minHeight: 'calc(100vh - 50px)',
        display: 'flex',
    },
} as const;
interface Props extends PropsWithChildren {
    main?: boolean;
    sub?: boolean;
    page?: boolean;
    logout?: boolean
}
export const AppScreen: FC<Props> = ({ children, main, sub, page, logout }) => {
    return (
        <StackFlowAppScreen>
            {main && <MenuBar />}
            {sub && <AppBar />}
            {page && <MyPageBar />}
            {logout && <ButtonBar />}
            <Container component="main" sx={style.spacing} maxWidth={false}>
                {children}
            </Container>
        </StackFlowAppScreen>
    );
};
