import React, { type FC, type PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';

export const SubTitle: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography variant="h4" gutterBottom>
            {children}
        </Typography>
    );
};
