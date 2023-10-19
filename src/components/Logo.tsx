import type { FC } from 'react';

const style = {
    logo: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
};

export const Logo: FC = () => {
    return <div style={style.logo}>Zoo Diary</div>;
};
