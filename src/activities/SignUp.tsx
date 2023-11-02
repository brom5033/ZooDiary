import { useRef, useState, type ChangeEvent } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import Stack from '@mui/material/Stack';
import { useFlow } from 'stackflow';
// component
import { AppScreen, SubTitle, Box, CheckBox, Input, Button } from '@components/index';
import { useLocalStorage, useLogin, useSignUp } from '@hooks/index';
import { userModel } from '@stores/index';
import { agreement, checkMessage } from '@constants/index';

type CheckType = null | 1 | 2 | 3 | 4 | 5 | 6;
type Check = Record<string, CheckType>;
export interface CheckMessage {
    id: Record<number, string>;
    password: Record<number, string>;
    passwordCheck: Record<number, string>;
    nickName: Record<number, string>;
}

export const SignUp: ActivityComponentType = () => {
    const { replace } = useFlow();

    const userModelStore = userModel();
    const [, setToken] = useLocalStorage('token');

    const nickNameRef = useRef<HTMLInputElement>();
    const idRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordCheckRef = useRef<HTMLInputElement>();

    const [checked, setChecked] = useState([false, false]);
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
        setCheck(checkObj);
        if (Object.keys(checkObj).filter((key) => checkObj[key]).length > 0) {
            return;
        }
        useSignUp(id, password, nickName)
            .then(() => {
                useLogin(id, password).then(({ data }) => {
                    const { user, nickName, token } = data.data;

                    userModelStore.setUser(user, nickName);
                    setToken(token);

                    replace('Board', {});
                });
            })
            .catch((error) => {
                const errorMessage = error.response.data.data;
                if (errorMessage === 'user') {
                    setCheck({ ...check, id: 2 });
                } else if (errorMessage === 'nickName') {
                    setCheck({ ...check, nickName: 2 });
                }
            });
    };

    const handleTotalChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handlePrivacyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], event.target.checked]);
    };

    return (
        <AppScreen sub>
            <Stack spacing={5}>
                <Stack>
                    <SubTitle>보호자 동의</SubTitle>
                    <CheckBox label="전체동의" checked={checked[0] && checked[1]} onChange={handleTotalChange} />
                    <Box multiline>{agreement.agree}</Box>
                    <CheckBox label="동의 (필수)" checked={checked[0]} onChange={handleTermsChange} />
                    <Box multiline>{agreement.privacy}</Box>
                    <CheckBox label="동의 (필수)" checked={checked[1]} onChange={handlePrivacyChange} />
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
                <Button border onClick={submit} disabled={!checked[0] || !checked[1]}>
                    회원가입
                </Button>
            </Stack>
        </AppScreen>
    );
};
