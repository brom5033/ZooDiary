import { type FC, useState } from 'react';
import { Card as MUICard, CardHeader, CardContent, CardActions, Typography, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// component
import { ProfileIcon } from '../ProfileIcon';
import { Title } from './Title';
import { Carousel } from './Carousel';
import { Action } from './Action';
import { Label } from './Label';
// utils
import { numberToString } from '@utils/numberToString';

const style = {
    font: {
        fontSize: '12px',
    },
    image: {
        width: '338px',
        height: '330px',
    },
    icon: {
        color: '#BF4158',
    },
    iconBox: {
        float: 'right',
    },
    iconMargin: {
        margin: '5px',
    },
} as const;

type Label = '기분좋아' | '평범해' | '기분나빠' | '산책 다녀왔어' | '간식 먹었어';

interface Image {
    src: string;
    fileName: string;
}

export interface Props {
    title: string;
    labels: Label[];
    bodyText: string;
    clickNumber: number;
    images?: Image[];
    time: string;
}

export const Card: FC<Props> = ({ title, labels, bodyText, clickNumber, images, time }) => {
    const [isHeartClick, setHeartClick] = useState(false);
    const heartToggle = () => setHeartClick(!isHeartClick);

    return (
        <MUICard>
            <CardHeader avatar={<ProfileIcon />} title={<Title time={time} title={title} />} action={<Action />} />
            <Carousel images={images} />
            <Label labels={labels} />
            <CardContent>
                <Typography sx={style.font}>{bodyText}</Typography>
            </CardContent>
            <CardActions sx={style.iconBox}>
                <Typography sx={style.iconMargin}>{numberToString(clickNumber)}</Typography>
                <Icon aria-label="add to favorites" onClick={heartToggle}>
                    {isHeartClick ? <FavoriteIcon sx={style.icon} /> : <FavoriteBorderIcon sx={style.icon} />}
                </Icon>
            </CardActions>
        </MUICard>
    );
};
