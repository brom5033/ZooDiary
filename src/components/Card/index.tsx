import { type FC, useState, useEffect } from 'react';
import { Card as MUICard, CardHeader, CardContent, CardActions, Typography, Icon } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
// component
import { userModel } from '@stores/index';
import { useHeart } from '@hooks/index';
import { numberToString } from '@utils/index';
import { ProfileIcon } from '@components/index';
import type { PostApi } from '@customType/index';
import { Title } from './Title';
import { Carousel } from './Carousel';
import { Action } from './Action';
import { Label } from './Label';

const style = {
    font: {
        fontSize: '12px',
        wordWrap: 'break-word',
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

export type Label = '기분좋아' | '평범해' | '기분나빠' | '산책 다녀왔어' | '간식 먹었어';

export interface Image {
    src: string;
    fileName: string;
}

export interface Props {
    id: number;
    title: string;
    labels: Label[];
    bodyText: string;
    heart: PostApi['Heart'];
    images?: Image[];
    time: string;
    profileImage?: string;
    demo?: boolean;
}

export const Card: FC<Props> = ({ id, title, labels, bodyText, heart, images, time, profileImage, demo }) => {
    const userModelStore = userModel();
    const [isHeartClick, setHeartClick] = useState(false);
    const [plusHeart, setPlusHeart] = useState(0);

    useEffect(() => {
        const myNickName = userModelStore.getUser().nickName;
        const isClicked = heart.filter((heart) => heart.user.nickName === myNickName)[0];
        setHeartClick(!!isClicked);
    }, [heart]);

    const handleHeartClick = () => {
        useHeart(id).then(() => {
            setHeartClick(!isHeartClick);

            const myNickName = userModelStore.getUser().nickName;
            const isClicked = heart.filter((heart) => heart.user.nickName === myNickName)[0];

            if (!isClicked && !isHeartClick) {
                setPlusHeart(1);
            } else if (!isClicked && isHeartClick) {
                setPlusHeart(0);
            } else if (isClicked && !isHeartClick) {
                setPlusHeart(0);
            } else {
                setPlusHeart(-1);
            }
        });
    };

    return (
        <MUICard>
            <CardHeader
                avatar={<ProfileIcon src={profileImage} alt={title} />}
                title={<Title time={time} title={title} />}
                action={userModelStore.getUser().nickName === title && <Action id={id} />}
            />
            <Carousel demo={demo} images={images} />
            {labels.length > 0 && <Label labels={labels} />}
            <CardContent>
                <Typography sx={style.font}>{bodyText}</Typography>
            </CardContent>
            <CardActions sx={style.iconBox}>
                <Typography sx={style.iconMargin}>{numberToString(heart.length + plusHeart)}</Typography>
                <Icon aria-label="add to favorites" onClick={handleHeartClick}>
                    {isHeartClick ? <FavoriteIcon sx={style.icon} /> : <FavoriteBorderIcon sx={style.icon} />}
                </Icon>
            </CardActions>
        </MUICard>
    );
};
