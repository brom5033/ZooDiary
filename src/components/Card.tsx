import React, { type FC, useState } from 'react';
import { Card as MUICard, CardHeader, CardMedia, CardContent, CardActions, Typography, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Swiper, SwiperSlide } from 'swiper/react';
// component
import { ProfileIcon } from './ProfileIcon';
import { Chip } from './Chip';

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

const labelColor = {
    기분좋아: 'hotpink',
    평범해: 'blue',
    기분나빠: 'purple',
    '산책 다녀왔어': 'orange',
    '간식 먹었어': 'pink',
} as const;

interface Image {
    src: string;
    fileName: string;
}

type Label = '기분좋아' | '평범해' | '기분나빠' | '산책 다녀왔어' | '간식 먹었어';

interface Props {
    title: string;
    labels: Label[];
    bodyText: string;
    clickNumber: number;
    images?: Image[];
}

const numberToString = (value: number) => {
    if (value > 1000000) {
        return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value > 1000) {
        return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
};

export const Card: FC<Props> = ({ title, labels, bodyText, clickNumber, images }) => {
    const [isHeartClick, setHeartClick] = useState(false);
    const heartToggle = () => setHeartClick(!isHeartClick);

    return (
        <MUICard>
            <CardHeader avatar={<ProfileIcon />} title={title} />
            <Swiper>
                {images?.map(({ src, fileName }) => (
                    <SwiperSlide key={fileName}>
                        <CardMedia component="img" image={src} alt={fileName} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {labels?.map((label) => <Chip key={label} label={label} color={labelColor[label]} />)}
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
