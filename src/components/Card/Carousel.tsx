import React, { type FC, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { CardMedia } from '@mui/material';
// props
import { Props } from '.';

const style = {
    pagination: {
        '--swiper-pagination-color': '#DC88A0',
        '--swiper-pagination-bullet-inactive-color': '#353537',
    },
};

interface CarouselProps {
    images?: Props['images'];
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
    return (
        <Swiper
            style={style.pagination as CSSProperties}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ clickable: true }}
        >
            {images?.map(({ src, fileName }) => (
                <SwiperSlide key={fileName}>
                    <CardMedia component="img" image={src} alt={fileName} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
