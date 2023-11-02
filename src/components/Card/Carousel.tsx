import { type FC, type CSSProperties, type ChangeEvent, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { CardMedia, Box as MUIBox } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import styled from '@emotion/styled';
// component
import { Box, FileUpload } from '@components/index';
import { ImageModel } from '@stores/index';
import { useFileUpload } from '@hooks/api';
import { Props as CardProps } from '.';

const style = {
    pagination: {
        '--swiper-pagination-color': '#DC88A0',
        '--swiper-pagination-bullet-inactive-color': '#353537',
    },
    imageBox: {
        background: 'black',
        height: '100%',
        alignSelf: 'center',
        display: 'flex',
    },
    fileBox: {
        width: '120px',
        margin: 'auto',
        marginBottom: '60px',
        textAlign: 'center',
    },
    imageWrap: { alignSelf: 'center', width: '100%' },
} as const;

interface Props {
    images?: CardProps['images'];
    upload?: boolean;
    demo?: boolean;
}

export const Carousel: FC<Props> = ({ images, upload, demo }) => {
    const [carouselImages, setCarouselImages] = useState(images);
    const [carouselPage, setCarouselPage] = useState<SwiperCore>();
    const imageModelStore = ImageModel();

    useEffect(() => {
        setCarouselImages(images);
    }, [images]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const index = carouselPage?.activeIndex;

        if (!carouselImages || index === undefined) return;

        // 사용자 화면에 이미지 보여주기
        const file = event.target.files?.[0] as File;
        const reader = new FileReader();

        reader.onload = ({ target }) => {
            carouselImages[index] = {
                fileName: `${file.name}-${new Date().toLocaleString()}`,
                src: target?.result as string,
            };

            useFileUpload(file).then((response) => {
                imageModelStore.setImage(index, response.data.data, carouselImages[index].fileName);
            });

            setCarouselImages([...carouselImages]);
        };

        reader.readAsDataURL(file as File);
    };

    return (
        <Swiper
            style={style.pagination as CSSProperties}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onSwiper={setCarouselPage}
        >
            {carouselImages?.map(({ src, fileName }) => (
                <Slider key={fileName}>
                    {upload && src === '' ? (
                        <Box sx={style.fileBox}>
                            <FileUpload onChange={handleChange}>
                                <AddPhotoAlternate />
                            </FileUpload>
                        </Box>
                    ) : upload && src !== '' ? (
                        <MUIBox sx={style.imageBox}>
                            <FileUpload onChange={handleChange}>
                                <CardMedia
                                    component="img"
                                    src={`${demo ? '' : 'http://localhost:3000'}${src}`}
                                    alt={fileName}
                                    width="100%"
                                />
                            </FileUpload>
                        </MUIBox>
                    ) : (
                        <MUIBox sx={style.imageBox}>
                            <div style={style.imageWrap}>
                                <CardMedia
                                    component="img"
                                    src={`${demo ? '' : 'http://localhost:3000'}${src}`}
                                    alt={fileName}
                                    width="100%"
                                />
                            </div>
                        </MUIBox>
                    )}
                </Slider>
            ))}
        </Swiper>
    );
};

const Slider = styled(SwiperSlide)`
    height: auto;
`;
