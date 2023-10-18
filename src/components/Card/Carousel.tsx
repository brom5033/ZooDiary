import { type FC, type CSSProperties, type ChangeEvent, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { CardMedia } from '@mui/material';
import { Box } from '@components/Box';
import { FileUpload } from '@components/FileUpload';
import { AddPhotoAlternate } from '@mui/icons-material';
// props
import { Props as CardProps } from '.';
import { ImageModel } from '@stores/image';
import { useFileUpload } from '@hooks/api/useFileUpload';

const style = {
    pagination: {
        '--swiper-pagination-color': '#DC88A0',
        '--swiper-pagination-bullet-inactive-color': '#353537',
    },
};

interface Props {
    images?: CardProps['images'];
    upload?: boolean;
}

export const Carousel: FC<Props> = ({ images, upload }) => {
    const [carouselImages, setCarouselImages] = useState(images);
    const imageModelStore = ImageModel();

    useEffect(() => {
        setCarouselImages(images);
    }, [images]);

    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        if (!carouselImages) return;

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
        >
            {carouselImages?.map(({ src, fileName }, index) => (
                <SwiperSlide key={fileName}>
                    {upload && src === '' ? (
                        <Box
                            sx={{
                                width: '120px',
                                height: '85px',
                                margin: 'auto',
                                marginBottom: '60px',
                                textAlign: 'center',
                            }}
                        >
                            <FileUpload onChange={handleChange(index)}>
                                <AddPhotoAlternate />
                            </FileUpload>
                        </Box>
                    ) : upload ? (
                        <FileUpload onChange={handleChange(index)}>
                            <CardMedia component="img" image={src} alt={fileName} />
                        </FileUpload>
                    ) : (
                        <CardMedia component="img" image={src} alt={fileName} />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
