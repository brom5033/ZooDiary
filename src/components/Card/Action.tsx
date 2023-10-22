import {type FC, useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//component
import { OverlayMenu } from '@components/OverlayMenu';
import { Button } from '@components/Button';

export const Action: FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <IconButton aria-label="settings">
            <OverlayMenu action={<MoreVertIcon />} open={open} setOpen={setOpen}>
                <Button danger>삭제</Button>
                <Button outlined>수정</Button>
            </OverlayMenu>
        </IconButton>
    );
};
