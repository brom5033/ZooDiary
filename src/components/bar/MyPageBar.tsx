import type { FC } from 'react';
import { useFlow } from 'stackflow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, Icon } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
// component
import { Logo } from '@components/index';

export const MyPageBar: FC = () => {
    const { push } = useFlow();

    const MyPageNavigation = () => push('MyPage', {});

    const gotoWriting = () => push('Writing', { postId: '' });

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
        button: {
            position: 'absolute',
            top: '14px',
            left: '12px',
        },
        iconColor: {
            color: '#353537',
            backgroundColor: '#CACCBE',
            borderRadius: '5px',
            width:'30px',
            padding: '2px',
            position: 'absolute',
            top: '14px',
            right: '12px',
        },
    } as const;

    return (
        <Container disableGutters component="header" sx={style.header}>
            <Logo />
            <Icon onClick={MyPageNavigation} sx={style.button}>
                <AccountCircleIcon />
            </Icon>
            <Icon onClick={gotoWriting}>
                <EditNoteIcon sx={style.iconColor} />
            </Icon>
        </Container>
    );
};
