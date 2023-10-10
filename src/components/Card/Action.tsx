import React, { type FC } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Action: FC = () => {
    return (
        <IconButton aria-label="settings">
            <MoreVertIcon />
        </IconButton>
    );
};
