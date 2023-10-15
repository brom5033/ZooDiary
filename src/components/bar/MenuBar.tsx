import React, { type FC } from 'react';
import { Container } from '@mui/material';

import { Logo } from '@components/Logo';

const style = {
    header: {
        color: '#353537',
        padding: '10px 12px',
        height: '30px',
    },
} as const;

export const MenuBar: FC = () => {
    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
        </Container>
    );
};
