import React, { type FC, type PropsWithChildren, type ChangeEvent } from 'react';
import styled from '@emotion/styled';

interface Props extends PropsWithChildren {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FileUpload: FC<Props> = ({ children, onChange }) => {
    return (
        <Label htmlFor="file">
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
