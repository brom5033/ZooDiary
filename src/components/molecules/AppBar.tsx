import React, { type FC, PropsWithChildren } from 'react';
import { useFlow } from 'stackflow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Icon } from '@mui/material';

import { Logo } from '@components/Logo';

export const AppBar: FC = () => {
    const { pop } = useFlow();

    const backNavigation = () => pop();

    const style = {
        header: {
            color: '#353537',
						marginTop: '12px'
        },

    } as const;
    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
            <Icon onClick={backNavigation}>
                <ArrowBackIcon />
            </Icon>
        </Container>
    );
};
