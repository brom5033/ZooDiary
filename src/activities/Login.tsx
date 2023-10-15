import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Stack } from '@mui/material';
// component
import { AppScreen } from '@components/AppScreen';
import { Box } from '@components/Box';
import { SubTitle } from '@components/SubTitle';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useFlow } from 'stackflow';

export const Login: ActivityComponentType = () => {
    const { push } = useFlow();

    const submit = () => {};
    const gotoSignUp = () => {
			push("SignUp", {})
		};

    return (
        <AppScreen main>
            <Stack gap="50px">
                <SubTitle>로그인</SubTitle>
                <Box>
                    <Input type="text" label="아이디" />
                    <Input type="password" label="비밀번호" />
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
