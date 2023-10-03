import React, { type FC } from 'react';
import { Checkbox as MUICheckbox } from '@mui/material';

// TODO: label 추가해야함
const style = {
    checkbox: {
        '.MuiSvgIcon-root': {
            color: '#CACCBE',
        },
    },
} as const;

export const CheckBox: FC = () => {
    return <MUICheckbox sx={style.checkbox} />;
};
