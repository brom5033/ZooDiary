import { type FC, type ChangeEvent, useState } from 'react';
import { AddPhotoAlternate } from '@mui/icons-material';
// component
import { FileUpload } from '@components/FileUpload';
import { Box } from '@components/Box';
import { usePutProfile } from '@hooks/api/usePutProfile';
import { useFileUpload } from '@hooks/api/useFileUpload';

export const ProfileImage: FC = () => {
    const [src, setSrc] = useState<string>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        const reader = new FileReader();

        reader.onload = ({ target }) => {
            setSrc(target?.result as string);
            useFileUpload(file).then((response) => {
                usePutProfile(response.data.data);
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box>
            {src ? (
                <FileUpload onChange={handleChange}>
                    <img src={src} alt="프로필 이미지" width="100%" />
                </FileUpload>
            ) : (
                <FileUpload onChange={handleChange} >
                    <AddPhotoAlternate />
                </FileUpload>
            )}
        </Box>
    );
};
