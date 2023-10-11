import React, { type FC } from 'react';

const style = {
    line: {
        width: '100%',
    },
}as const;

export const Hr: FC = () => {
    return <hr style={style.line} />;
};
