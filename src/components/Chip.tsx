import type { FC, ReactNode, MouseEventHandler } from 'react';
import { Chip as MUIChip } from '@mui/material';

const colorPalette = {
    hotpink: '#F24B78',
    blue: '#85C8F2',
    purple: '#7663F2',
    orange: '#EDA57C',
    pink: '#FB9595',
} as const;

type ColorPalette = keyof typeof colorPalette;

interface Props {
    label: ReactNode;
    color: ColorPalette;
    onClick?: MouseEventHandler<HTMLDivElement>;
    active?: boolean;
}

export const Chip: FC<Props> = ({ label, color, onClick, active }) => {
    const style = {
        chip: {
            color: 'white',
            backgroundColor: active ? colorPalette[color] : 'gray',
            '&:hover, &:focus': {
                backgroundColor: colorPalette[color],
            },
            '&:active': {
                backgroundColor: colorPalette[color],
            },
        },
    } as const;

    return <MUIChip label={label} sx={style.chip} size="small" onClick={onClick} />;
};
