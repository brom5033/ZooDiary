import type { FC, PropsWithChildren } from 'react';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container, Grid } from '@mui/material';
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
    logout?: boolean;
}
export const AppScreen: FC<Props> = ({ children, main, sub, page, logout }) => {
    return (
        <StackFlowAppScreen>
            <Grid container direction="row">
                <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={8}>
                    test
                </Grid>
                <Grid item sm={12} md={4} sx={{width:'100%'}}>
                    {main && <MenuBar />}
                    {sub && <AppBar />}
                    {page && <MyPageBar />}
                    {logout && <ButtonBar />}
                    <Container component="main" sx={style.spacing} maxWidth={false}>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </StackFlowAppScreen>
    );
};
