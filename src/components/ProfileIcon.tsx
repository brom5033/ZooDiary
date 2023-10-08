import React, { type FC } from 'react';
import { Avatar } from '@mui/material';

interface Props {
    alt?: string;
    src?: string;
}

export const ProfileIcon: FC<Props> = ({ alt, src }) => {
    return <Avatar alt={alt} src={src} />;
};
