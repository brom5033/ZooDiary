import type { FC } from 'react';
import { Container } from '@mui/material';
// component
import { Logo } from '@components/index';

const style = {
    header: {
        color: '#353537',
        padding: '10px 12px',
        height: '50px',
        position: 'sticky',
        zIndex: 1000,
        top: 0,
        backgroundColor: 'white',
    },
} as const;

export const MenuBar: FC = () => {
    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
        </Container>
    );
};
