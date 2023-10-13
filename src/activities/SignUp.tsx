import React, { useRef, useState } from 'react';
import { type ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@components/AppScreen';
import Stack from '@mui/material/Stack';
// component
import { SubTitle } from '@components/SubTitle';
import { Box } from '@components/Box';
import { CheckBox } from '@components/CheckBox';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type Check = { [key in string]: boolean };

export const SignUp: ActivityComponentType = () => {
    const nickNameRef = useRef<HTMLInputElement>();

    const [check, setCheck] = useState<Check>({
        id: true,
        password: true,
        passwordCheck: true,
        nickName: true,
    });

    const submit = () => {
        const checkObj: Check = check;

        // Input 정보
        const nickName = nickNameRef?.current?.value ?? '';

        // 조건 필터링
        checkObj.nickName = nickName.length > 3;

        // 가입 가능 여부
        setCheck({ ...checkObj });
        if (Object.keys(checkObj).filter((key) => !checkObj[key]).length > 0) {
            console.log('회원가입 실패');
            return;
        }

        console.log('회원가입 성공');
    };

    return (
        <AppScreen sub>
            <Stack spacing={5}>
                <Stack>
                    <SubTitle>보호자 동의</SubTitle>
                    <CheckBox label="전체동의" />
                    <Box mutiline>
                        제 1 조 (목적) 본 약관은 문화체육관광부 대표누리집 (이하 "누리집")이 제공하는 모든 서비스(이하
                        "서비스")의 이용조건 및 절차, 이용자와 누리집의 권리, 의무, 책임사항과 기타 제반 는 변경되어야
                        합니다. 3. 이용자번호(ID)는 다음 각 호에 해당하는 경우에는 이용고객 또는 회사의 요청으로 변경할
                        수 있습니다. ① 이용자번호(ID)가 이용자의 전화번호 또는 주민등록번호 등으로 등록되어{' '}
                    </Box>
                    <CheckBox label="동의" />
                    <Box mutiline>
                        1. 수집하는 개인정보 항목 문화체육관광부 대표 누리집의 이용자 참여와 이용통계 분석 등의 서비스를
                        위해 회원 가입시 아래의 개인정보를 수집하고 있습니다. 가. 필수정보: 아이디, 이름, 성별,
                        출생년도, 비밀번호, 이메일 나. 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어
                        수집될 수 있습니다. (접속로그, 접속IP정보, 쿠키, 방문 일시, 서비스 이용기록, 불량 이용 기록) 2.
                        대표 누리집에서 이용자 회원가입 시 직접 개인정보를 입력 및 수정하여 개인정보를 수집합니다. 다.
                    </Box>
                    <CheckBox label="동의" />
                </Stack>
                <Stack>
                    <SubTitle>보호자 정보</SubTitle>
                    <Stack>
                        <Box>
                            <Input
                                ref={nickNameRef}
                                type="text"
                                label="닉네임"
                                helperText={check.nickName === false && '누군가 사용하고 있는 것 같아요'}
                            />
                            <Input type="text" label="아이디" />
                            <Input type="password" label="비밀번호" />
                            <Input type="password" label="비밀번호 확인" />
                        </Box>
                    </Stack>
                </Stack>
                <Button border onClick={submit}>
                    회원가입
                </Button>
            </Stack>
        </AppScreen>
    );
};
