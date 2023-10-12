import React, { type FC } from 'react';
import { Container } from '@mui/material';
import { useFlow } from 'stackflow';

import { Logo } from '@components/Logo';

export const MenuBar: FC = () => {
    const { push } = useFlow();
    const goBoardPage = () => push('Board', {});

    return (
        <Container onClick={goBoardPage}>
            <Logo />
        </Container>
    );
};
