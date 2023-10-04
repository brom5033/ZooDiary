import React, { type FC, type ChangeEvent } from 'react';
import { Checkbox as MUICheckbox, FormControlLabel } from '@mui/material';


const style = {
    checkbox: {
        '.MuiSvgIcon-root': {
            color: '#CACCBE',
        },
    },
} as const;

interface Props {
    label: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    checked?: boolean;
    indeterminate?: boolean;
}
export const CheckBox: FC<Props> = ({ label, onChange, checked, indeterminate }) => {
    return (
        <FormControlLabel
            label={label}
            control={
                <MUICheckbox sx={style.checkbox} checked={checked} indeterminate={indeterminate} onChange={onChange} />
            }
        />
    );
};
