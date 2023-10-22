import { type FC, useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// component
import { OverlayMenu } from '@components/OverlayMenu';
import { Button } from '@components/Button';
import { useDeletePost } from '@hooks/api/useDeletePost';
import { useGetPost } from '@hooks/api/useGetPost';
import { postModel } from '@stores/post';

interface Props {
    id: number;
}

export const Action: FC<Props> = ({ id }) => {
    const [open, setOpen] = useState(false);

    const postModelStore = postModel();

    const handleDeleteClick = () => {
        useDeletePost(id).then(() => {
            useGetPost().then((response) => {
                postModelStore.setPost(response.data.data);
                setOpen(false);
            });
        });
    };

    return (
        <IconButton aria-label="settings">
            <OverlayMenu action={<MoreVertIcon />} open={open} setOpen={setOpen}>
                <Button danger onClick={handleDeleteClick}>
                    삭제
                </Button>
                <Button outlined>수정</Button>
            </OverlayMenu>
        </IconButton>
    );
};
