import type { FC, PropsWithChildren } from 'react';
import { AppScreen as StackFlowAppScreen } from '@stackflow/plugin-basic-ui';
import { Container, Grid, Typography, Stack, Link } from '@mui/material';
// component
import { AppBar, MenuBar, MyPageBar, ButtonBar, Box, Card } from '@components/index';

const style = {
    spacing: {
        paddingTop: '24px',
        paddingBottom: '24px',
        minHeight: 'calc(100vh - 50px)',
        display: 'flex',
    },
} as const;

interface Props extends PropsWithChildren {
    main?: boolean;
    sub?: boolean;
    page?: boolean;
    logout?: boolean;
}

export const AppScreen: FC<Props> = ({ children, main, sub, page, logout }) => {
    const generateHeart = (count: number) => {
        return new Array(count).map((_, index) => {
            return {
                user: {
                    nickName: index.toString(),
                    createdAt: new Date().toString(),
                    picture: '',
                },
            };
        });
    };

    return (
        <StackFlowAppScreen>
            <Grid container direction="row">
                <Grid item sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#CACCBE' }} md={8}>
                    <Container sx={{ position: 'sticky', top: 0 }}>
                        <Stack gap="20px">
                            <Stack sx={{ textAlign: 'center', marginTop: 5 }}>
                                <Typography sx={{ fontSize: '32px', color: '#353537' }}>Zoo Diary</Typography>
                                <Typography>반려동물의 행복한 일상</Typography>
                            </Stack>

                            <Grid container spacing={10} direction="row">
                                <Grid item xs={6}>
                                    <Stack width="100%">
                                        <Typography sx={{ fontSize: '28px', color: '#BF4158' }}>사랑</Typography>
                                        <Typography>반려동물과의 일상을 공유해보아요.</Typography>
                                        <Typography>행복한 날, 기록해보아요.</Typography>
                                        <img
                                            src="/ZooDiary/images/lovedog.jpg"
                                            alt="강아지 사진"
                                            style={{ maxHeight: '250px', objectFit: 'cover', borderRadius: '35px' }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontSize: '28px', color: '#BF4158' }}>공유</Typography>
                                        <Typography>반려동물과 함께 살아가는 보호자분</Typography>
                                        <Typography>함께 소통하고 정보를 공유해요.</Typography>
                                        <img
                                            src="/ZooDiary/images/flowerdog.jpg"
                                            alt="강아지 사진"
                                            style={{ maxHeight: '250px', objectFit: 'cover', borderRadius: '35px' }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack>
                                <Box>
                                    <Typography>
                                        GitHub:
                                        <Link
                                            href="https://github.com/brom5033/ZooDiary"
                                            target="_blank"
                                            underline="hover"
                                            color="#DC88A0"
                                            sx={{ marginLeft: 1 }}
                                        >
                                            주다이어리 코드 보러가요.
                                        </Link>
                                    </Typography>
                                    <Typography>
                                        Figma:
                                        <Link
                                            href="https://www.figma.com/file/R3RnoAUBlLY1ASy45ME2C8/Zoo-Diary?type=design&t=BlqG7f7VdU8tulPd-6"
                                            target="_blank"
                                            underline="hover"
                                            color="#DC88A0"
                                            sx={{ marginLeft: 1 }}
                                        >
                                            피그마에서 어떻게 작업을 했을까요?
                                        </Link>
                                    </Typography>
                                    <Typography>
                                        Notion:
                                        <Link
                                            href="https://gaudy-baryonyx-7e4.notion.site/Zoo-Diary-8ae3a505ff5c47dabbd326e271dc2e29?pvs=4"
                                            target="_blank"
                                            underline="hover"
                                            color="#DC88A0"
                                            sx={{ marginLeft: 1 }}
                                        >
                                            주다이어리의 기획과 개발 단계를 소개해요.
                                        </Link>
                                    </Typography>
                                </Box>
                            </Stack>
                            <Grid container spacing={6}>
                                <Grid item sx={{ width: '33%' }}>
                                    <Card
                                        id={1}
                                        title="쿠키멍"
                                        labels={['기분좋아', '산책 다녀왔어']}
                                        bodyText="오늘은 애견카페를 갔다. 여러 강아지들이랑 열심히 재미있게 놀았다. 또 가고싶다."
                                        heart={generateHeart(10000)}
                                        time={new Date(new Date().setHours(new Date().getHours() - 3)).toString()}
                                        profileImage="/ZooDiary/images/profileImage.jpg"
                                        images={[{ src: '/ZooDiary/images/cookie.jpg', fileName: 'cookie' }]}
                                        demo
                                    />
                                    {new Date(new Date().setHours(3)).toString()}
                                </Grid>
                                <Grid item sx={{ width: '33%' }}>
                                    <Card
                                        id={2}
                                        title="helloCookie"
                                        labels={['평범해']}
                                        bodyText="오늘은 바깥바람을 품에 안겨서 쐬고왔따. 나는 걷고싶었는데...."
                                        heart={generateHeart(10000)}
                                        time={new Date(new Date().setDate(new Date().getDate() - 8)).toString()}
                                        profileImage="/ZooDiary/images/profileImage2.jpg"
                                        images={[{ src: '/ZooDiary/images/cookie2.jpg', fileName: 'cookie' }]}
                                        demo
                                    />
                                </Grid>
                                <Grid item sx={{ width: '33%' }}>
                                    <Card
                                        id={3}
                                        title="댕댕이좋아"
                                        labels={['기분나빠', '간식 먹었어']}
                                        bodyText="미용을 했는데 간식을 조금밖에 안줘서 기분이 별로 안좋았다. 매우 화난다.멍"
                                        heart={generateHeart(10000)}
                                        time={new Date(new Date().setMinutes(new Date().getMinutes() - 17)).toString()}
                                        profileImage="/ZooDiary/images/Exdog.jpg"
                                        images={[{ src: '/ZooDiary/images/cookie3.jpg', fileName: 'cookie' }]}
                                        demo
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Container>
                </Grid>
                <Grid item sm={12} md={4} sx={{ width: '100%' }}>
                    {main && <MenuBar />}
                    {sub && <AppBar />}
                    {page && <MyPageBar />}
                    {logout && <ButtonBar />}
                    <Container component="main" sx={style.spacing} maxWidth={false}>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </StackFlowAppScreen>
    );
};
