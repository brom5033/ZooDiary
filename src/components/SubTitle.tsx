import React, { type FC, type PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';

const style = {
    subtitle: {
        color: '#353537',
    },
};

export const SubTitle: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography variant="h5" gutterBottom sx={style.subtitle}>
            {children}
        </Typography>
    );
};
