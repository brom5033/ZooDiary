import React, { type FC, type ReactNode, type ChangeEventHandler } from 'react';
import { TextField as MUITextFiled } from '@mui/material';

interface Props {
    id?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value?: unknown;
    defaultValue?: unknown;
    multiline?: boolean;
}

export const Input: FC<Props> = ({ id, label, helperText, onChange, value, defaultValue, multiline }) => {
    const style = {
        input: {
            '& .MuiInputBase-input': {
                borderRadius: '35px',
            },
            '& label.Mui-focused': {
                color: '#353537',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#CACCBE',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#CACCBE',
                },
                '&:hover fieldset': {
                    borderColor: '#CACCBE',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#CACCBE',
                },
            },
        },
    } as const;

    return (
        <MUITextFiled
            sx={style.input}
            id={id}
            label={label}
            helperText={helperText}
            fullWidth
            margin="dense"
            size="small"
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            multiline={multiline}
        />
    );
};
