import type { FC, PropsWithChildren, MouseEventHandler } from 'react';
import { Button as MUIButton } from '@mui/material';

interface Props extends PropsWithChildren {
    outlined?: boolean;
    dense?: boolean;
    danger?: boolean;
    border?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = ({ children, outlined, dense, danger, border, disabled, onClick }) => {
    const commonStyle = {
        width: '100%',
        height: dense ? '38px' : '61px',
        borderRadius: border ? '35px' : '5px',
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

    return (
        <MUIButton onClick={onClick} sx={outlined ? style.outlined : style.button} disabled={disabled}>
            {children}
        </MUIButton>
    );
};
