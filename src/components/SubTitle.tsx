import React, { type FC, type PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';

interface Props extends PropsWithChildren {
    marginZero?: boolean;
}

export const SubTitle: FC<Props> = ({ children, marginZero }) => {
    const style = {
        subtitle: {
            color: '#353537',
            marginBottom: marginZero ? '0': '0.35em'
        },
    } as const;

    return (
        <Typography variant="h5" gutterBottom sx={style.subtitle}>
            {children}
        </Typography>
    );
};
