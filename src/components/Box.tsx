import type { FC, PropsWithChildren } from 'react';
import { Box as MUIBox, type SxProps, type Theme } from '@mui/material';

interface Props extends PropsWithChildren {
    multiline?: boolean;
    border?: boolean;
    sx?: SxProps<Theme>
}

export const Box: FC<Props> = ({ children, multiline, border, sx }) => {
    const style = {
        box: {
            width: '100%',
            height: multiline ? '158px' : 'auto',
            borderRadius: border ? '5px' : '35px',
            border: '1px solid #CACCBE',
            overflowY: 'auto',
            ...sx
        },
        textBox: {
            padding: '24px',
            textWrap: 'wrap',
        },
    } as const;

    return (
        <MUIBox sx={style.box}>
            <MUIBox sx={style.textBox}>{children}</MUIBox>
        </MUIBox>
    );
};
