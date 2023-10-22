import { type ReactNode, type ChangeEventHandler, type KeyboardEvent, forwardRef } from 'react';
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
    border?: boolean;
    maxLength?: number;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef(
    (
        {
            type = 'text',
            id,
            label,
            helperText,
            onChange,
            onKeyDown,
            value,
            defaultValue,
            multiline,
            border,
            maxLength,
        }: Props,
        ref,
    ) => {
        const style = {
            input: {
                '& .MuiInputBase-root': {
                    borderRadius: border ? '5px' : '35px',
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
                '& p': {
                    color: '#BF4158',
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
                onKeyDown={onKeyDown}
                inputProps={{ maxLength }}
            />
        );
    },
);
