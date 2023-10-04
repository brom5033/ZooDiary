import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@components/Button';
import { Box } from '@components/Box';
import { CheckBox } from '@components/CheckBox';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Button outlined>dd</Button>
        <Box>
            제 1장 총칙 제 1 조(목적) 본 약관은 국가공간정보포털 웹사이트(이하 "국가공간정보포털")가 제공하는 모든
            서비스(이하 "서비스")의 이용조건 및 절차, 회원과 국가공간정보포털의 권리, 의무, 책임사항과 기타 필요한
            사항을 규정함을 목적으로 합니다. 제 2 조(약관의 효력과 변경) 1. 국가공간정보포털은 이용자가 본 약관 내용에
            동의하는 경우, 국가공간정보포털의 서비스 제공 행위 및 회원의 서비스 사용 행위에 본 약관이 우선적으로
            적용됩니다. 2. 국가공간정보포털은 약관을 개정할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께
            국가공간정보포털의 초기화면에 그 적용일 7일 이전부터 적용 전일까지 공지합니다. 단, 회원에 불리하게
            약관내용을 변경하는 경우에는 최소한 30일 이상의 사전
        </Box>
        <CheckBox label="박스" />
    </React.StrictMode>,
);
