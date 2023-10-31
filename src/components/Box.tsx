import type { FC, PropsWithChildren } from 'react';
import { Box as MUIBox, type SxProps, type Theme } from '@mui/material';

interface Props extends PropsWithChildren {
    multiline?: boolean;
    border?: boolean;
    sx?: SxProps<Theme>;
    noGutter?: boolean;
}

export const Box: FC<Props> = ({ children, multiline, border, sx, noGutter }) => {
    const style = {
        box: {
            width: '100%',
            height: multiline ? '158px' : 'auto',
            borderRadius: border ? '5px' : '35px',
            border: '1px solid #CACCBE',
            overflowY: 'auto',
            backgroundColor: 'white',
            ...sx,
        },
        textBox: {
            height: '100%',
            padding: noGutter ? 0 :'24px',
            textWrap: 'wrap',
        },
    } as const;

    return (
        <MUIBox sx={style.box}>
            <MUIBox sx={style.textBox}>{children}</MUIBox>
        </MUIBox>
    );
};
