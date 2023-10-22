import type { FC } from 'react';
// Props
import type { Props } from '.';
// component
import { Chip } from '@components/Chip';

const labelColor = {
    기분좋아: 'hotpink',
    평범해: 'blue',
    기분나빠: 'purple',
    '산책 다녀왔어': 'orange',
    '간식 먹었어': 'pink',
} as const;

interface LabelProps {
    labels: Props['labels'];
}

export const Label: FC<LabelProps> = ({ labels }) => {
    return labels?.map((label) => <Chip key={label} label={label} color={labelColor[label]} active />);
};
