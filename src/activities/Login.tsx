import { useRef, useState, type KeyboardEvent } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
import { useFlow } from 'stackflow';
// component
import { AppScreen, Box, SubTitle, Input, Button } from '@components/index';
import { useLogin, useLocalStorage } from '@hooks/index';
import { userModel } from '@stores/index';

export const Login: ActivityComponentType = () => {
    const { push, replace } = useFlow();
    const [Check, setCheck] = useState(false);
    const userModelStore = userModel();
    const [, setToken] = useLocalStorage('token');

    const idRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const gotoSignUp = () => {
        push('SignUp', {});
    };

    const submit = () => {
        const id = idRef?.current?.value ?? '';
        const password = passwordRef?.current?.value ?? '';

        if (id.length === 0 || password.length === 0) {
            setCheck(true);
            return;
        }

        useLogin(id, password)
            .then(({ data }) => {
                const { user, nickName, token } = data.data;

                userModelStore.setUser(user, nickName);
                setToken(token);
                replace('Board', {});
            })
            .catch(() => {
                setCheck(true);
            });
    };

    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    return (
        <AppScreen main>
            <Stack gap="50px">
                <SubTitle>로그인</SubTitle>
                <Box>
                    <Input
                        onKeyDown={handleOnKeyDown}
                        ref={idRef}
                        type="text"
                        label="아이디"
                        helperText={Check && '🐕 계정 정보가 틀린거 같아요'}
                    />
                    <Input onKeyDown={handleOnKeyDown} ref={passwordRef} type="password" label="비밀번호" />
                </Box>
                <Stack gap="14px">
                    <Button border onClick={submit}>
                        로그인
                    </Button>
                    <Button border outlined onClick={gotoSignUp}>
                        회원가입
                    </Button>
                </Stack>
            </Stack>
        </AppScreen>
    );
};
