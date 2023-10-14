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

type CheckType = null | 1 | 2 | 3 | 4 | 5 | 6;
type Check = Record<string, CheckType>;
interface CheckMessage {
    id: Record<number, string>;
    password: Record<number, string>;
    passwordCheck: Record<number, string>;
    nickName: Record<number, string>;
}

const checkMessage: CheckMessage = {
    id: {
        1: '🐕 2글자 이상 작성해야 해요',
        2: '🐕 누군가 사용하고 있는 아이디에요',
        3: '🐕 20글자 미만 작성 해야해요',
        4: '🐕 특수문자는 사용할 수 없어요',
        5: '🐕 닉네임과 다른 아이디를 사용해야 해요',
        6: '🐕 한국어는 아이디로 사용할 수 없어요',
    },
    password: {
        1: '🐕 8글자 이상 작성해야 해요',
        2: '🐕 누군가 사용하고 있는 닉네임이에요',
        3: '🐕 40글자 미만 작성해야 해요',
        4: '🐕 한국어는 비밀번호로 사용할 수 없어요',
    },
    passwordCheck: {
        1: '🐕 비밀번호가 일치하지 않아요',
    },
    nickName: {
        1: '🐕 2글자 이상 작성해야 해요',
        2: '🐕 누군가 사용하고 있는 닉네임이에요',
        3: '🐕 20글자 미만 작성해야 해요',
        4: '🐕 특수문자는 사용할 수 없어요',
    },
} as const;

export const SignUp: ActivityComponentType = () => {
    const nickNameRef = useRef<HTMLInputElement>();
    const idRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordCheckRef = useRef<HTMLInputElement>();

    const [check, setCheck] = useState<Check>({
        id: null,
        password: null,
        passwordCheck: null,
        nickName: null,
    });

    const submit = () => {
        const checkObj: Check = {
            id: null,
            password: null,
            passwordCheck: null,
            nickName: null,
        };

        // Input 정보
        const nickName = nickNameRef?.current?.value ?? '';
        const id = idRef?.current?.value ?? '';
        const password = passwordRef?.current?.value ?? '';
        const passwordCheck = passwordCheckRef?.current?.value ?? '';

        const specialCharacter = /[~!@#$%^&*()_+|<>?:{}]/;
        // 닉네임 조건 필터링
        if (nickName.length < 1) {
            checkObj.nickName = 1;
        } else if (nickName.length > 20) {
            checkObj.nickName = 3;
        } else if (specialCharacter.test(nickName)) {
            checkObj.nickName = 4;
        }

        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        // 아이디 조건 필터링
        if (id.length < 1) {
            checkObj.id = 1;
        } else if (id.length > 20) {
            checkObj.id = 3;
        } else if (specialCharacter.test(id)) {
            checkObj.id = 4;
        } else if (nickName === id) {
            checkObj.id = 5;
        } else if (korean.test(id)) {
            checkObj.id = 6;
        }

        // 비밀번호 조건 필터링
        if (password.length <= 8) {
            checkObj.password = 1;
        } else if (password.length > 40) {
            checkObj.password = 3;
        } else if (korean.test(password)) {
            checkObj.password = 4;
        }

        // 비밀번호 체크 조건 필터링
        if (password !== passwordCheck) {
            checkObj.passwordCheck = 1;
        }

        // 가입 가능 여부
        setCheck({ ...checkObj });
        if (Object.keys(checkObj).filter((key) => checkObj[key]).length > 0) {
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
                                helperText={checkMessage.nickName[check.nickName ?? 0] ?? ''}
                            />
                            <Input
                                ref={idRef}
                                type="text"
                                label="아이디"
                                helperText={checkMessage.id[check.id ?? 0] ?? ''}
                            />
                            <Input
                                ref={passwordRef}
                                type="password"
                                label="비밀번호"
                                helperText={checkMessage.password[check.password ?? 0] ?? ''}
                            />
                            <Input
                                ref={passwordCheckRef}
                                type="password"
                                label="비밀번호 확인"
                                helperText={checkMessage.passwordCheck[check.passwordCheck ?? 0] ?? ''}
                            />
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
