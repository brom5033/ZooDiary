import { type FC, type CSSProperties, type ChangeEvent, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { CardMedia, Box as MUIBox } from '@mui/material';
import { Box } from '@components/Box';
import { FileUpload } from '@components/FileUpload';
import { AddPhotoAlternate } from '@mui/icons-material';
import styled from '@emotion/styled';
// props
import { Props as CardProps } from '.';
import { ImageModel } from '@stores/image';
import { useFileUpload } from '@hooks/api/useFileUpload';

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
} as const;

interface Props {
    images?: CardProps['images'];
    upload?: boolean;
}

export const Carousel: FC<Props> = ({ images, upload }) => {
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
                console.log(response);
                imageModelStore.setImage(index, '', carouselImages[index].fileName);
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
                                <CardMedia component="img" src={src} alt={fileName} width="100%" />
                            </FileUpload>
                        </MUIBox>
                    ) : (
                        <MUIBox sx={style.imageBox}>
                            <CardMedia component="img" src={src} alt={fileName} width="100%" />
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
