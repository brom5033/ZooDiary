import { useRef, useState } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
// component
import { AppScreen } from '@components/AppScreen';
import { Box } from '@components/Box';
import { SubTitle } from '@components/SubTitle';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useFlow } from 'stackflow';

import { useLogin } from '@hooks/api/useLogin';
import { userModel } from '@stores/user';
import { useLocalStorage } from '@hooks/useLocalStorage';

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

    return (
        <AppScreen main>
            <Stack gap="50px">
                <SubTitle>로그인</SubTitle>
                <Box>
                    <Input
                        ref={idRef}
                        type="text"
                        label="아이디"
                        helperText={Check && '🐕 계정 정보가 틀린거 같아요'}
                    />
                    <Input ref={passwordRef} type="password" label="비밀번호" />
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
