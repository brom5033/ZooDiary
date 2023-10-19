import type { FC } from 'react';
import { useFlow } from 'stackflow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Icon } from '@mui/material';
// component
import { Logo } from '@components/Logo';
import { Logout } from '@components/Logout';

export const ButtonBar: FC = () => {
    const { pop } = useFlow();

    const backNavigation = () => pop();

    const style = {
        header: {
            color: '#353537',
            padding: '10px 12px',
            height: '30px',
        },
        icon: {
            position: 'absolute',
            top: '14px',
            left: '12px',
        },
    } as const;

    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
            <Icon onClick={backNavigation} sx={style.icon}>
                <ArrowBackIcon />
            </Icon>
            <Logout />
        </Container>
    );
};
