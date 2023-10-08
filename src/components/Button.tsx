import React, { type FC, type PropsWithChildren } from 'react';
import { Button as MUIButton } from '@mui/material';

interface Props extends PropsWithChildren {
    outlined?: boolean;
    dense?: boolean;
    danger?: boolean;
}

export const Button: FC<Props> = ({ children, outlined, dense, danger }) => {
    const commonStyle = {
        borderRadius: '35px',
        width: '100%',
        height: dense ? '38px' : '61px',
    } as const;
    const style = {
        button: {
            color: danger ? 'white' : '#353537',
            backgroundColor: danger ? '#BF4158' : '#CACCBE',
            ...commonStyle,
        },
        outlined: {
            color: danger ? '#BF4158' : '#7C8164',
            border: `1px solid ${danger ? '#BF4158' : '#CACCBE'}`,
            ...commonStyle,
        },
    } as const;

    return <MUIButton sx={outlined ? style.outlined : style.button}>{children}</MUIButton>;
};
