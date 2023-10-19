import type { FC, PropsWithChildren, ChangeEvent } from 'react';
import styled from '@emotion/styled';

const style = {
    label: {
        alignSelf: 'center',
        width: '100%',
    },
}as const;

interface Props extends PropsWithChildren {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: FC<Props> = ({ children, onChange }) => {
    return (
        <Label htmlFor="file" style={style.label}>
            {children}
            <Input id="file" type="file" onChange={onChange} accept="image/*" />
        </Label>
    );
};

const Label = styled.label`
    cursor: pointer;
`;

const Input = styled.input`
    display: none;
`;
