import React, { type FC } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//component
import { OverlayMenu } from '@components/OverlayMenu';
import { Button } from '@components/Button';

export const Action: FC = () => {
    return (
        <IconButton aria-label="settings">
            <OverlayMenu action={<MoreVertIcon />}>
                <Button danger>삭제</Button>
                <Button outlined>수정</Button>
            </OverlayMenu>
        </IconButton>
    );
};
