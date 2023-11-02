import type { FC } from 'react';
import { Typography } from '@mui/material';
// props
import { stringToDday } from '@utils/index';
import { Props } from '.';


interface TitleProps {
    time: Props['time'];
    title: Props['title'];
}

const style = {
    subHeader: {
        marginLeft: '5px',
        color: '#353537',
        fontSize: 'smaller',
        '::before': {
            content: '"•"',
        },
    },
};

export const Title: FC<TitleProps> = ({ title, time }) => {
    return (
        <>
            {title}
            <Typography component="span" sx={style.subHeader}>
                {stringToDday(time)}
            </Typography>
        </>
    );
};
