import React, { type FC, PropsWithChildren } from 'react';
import {
    Card as MUICard,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from '@mui/material';
import { ProfileIcon } from './ProfileIcon';
import { Chip } from './Chip';

interface Props extends PropsWithChildren {
    title: string | number;
}

export const Card: FC<Props> = ({ title, children }) => {
    return (
        <MUICard>
            <CardHeader avatar={<ProfileIcon />} title={title} />
            <CardMedia component="img" image="" alt="Paella dish" />
            <CardContent>
                <Chip label="기분좋아" color="hotpink" />
                <Typography>{children}</Typography>
            </CardContent>
            <CardActions></CardActions>
        </MUICard>
    );
};
