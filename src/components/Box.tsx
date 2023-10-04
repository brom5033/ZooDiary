import React, { type FC, type PropsWithChildren } from 'react';
import { Box as MUIBox } from '@mui/material';

const style = {
    box: {
        width: '100%',
        height: '158px',
        borderRadius: '35px',
        border: '1px solid #CACCBE',
        overflowY: 'auto',
    },
    textBox: {
        padding: '24px',
        textWrap: 'wrap',
    },
} as const;

export const Box: FC<PropsWithChildren> = ({ children }) => {
    return (
        <MUIBox sx={style.box}>
            <MUIBox sx={style.textBox}>{children}</MUIBox>
        </MUIBox>
    );
};
