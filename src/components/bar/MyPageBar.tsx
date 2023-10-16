import React, { type FC, PropsWithChildren } from 'react';
import { useFlow } from 'stackflow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, Icon } from '@mui/material';
// component
import { Logo } from '@components/Logo';

export const MyPageBar: FC = () => {
    const { push } = useFlow();

    const MyPageNavigation = () => push('MyPage', {});

    const style = {
        header: {
            color: '#353537',
            padding: '10px 12px',
            height: '30px',
        },
        button: {
            position: 'absolute',
            top: '14px',
            right: '12px',
        }
    } as const;

    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
            <Icon onClick={MyPageNavigation} sx={style.button}>
                <AccountCircleIcon />
            </Icon>
        </Container>
    );
};