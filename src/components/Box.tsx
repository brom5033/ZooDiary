import React, { type FC, type PropsWithChildren } from 'react';
import { Box as MUIBox } from '@mui/material';

interface Props extends PropsWithChildren {
    mutiline?: boolean;
}

export const Box: FC<Props> = ({ children, mutiline }) => {
    const style = {
        box: {
            width: '100%',
            height: mutiline ? '158px' : 'auto',
            borderRadius: '35px',
            border: '1px solid #CACCBE',
            overflowY: 'auto',
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
