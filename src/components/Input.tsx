import React, { type ReactNode, type ChangeEventHandler, forwardRef } from 'react';
import { TextField as MUITextFiled } from '@mui/material';

interface Props {
    type?: string;
    id?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value?: unknown;
    defaultValue?: unknown;
    multiline?: boolean;
}

export const Input = forwardRef(
    ({ type = 'text', id, label, helperText, onChange, value, defaultValue, multiline }: Props, ref) => {
        const style = {
            input: {
                '& .MuiInputBase-root': {
                    borderRadius: '35px',
                    '& textarea': {
                        height: multiline ? '170px !important' : '',
                    },
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
                "& p" :{
                    color: '#BF4158'
                },
            },
        } as const;

        return (
            <MUITextFiled
                inputRef={ref}
                type={type}
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
    },
);
