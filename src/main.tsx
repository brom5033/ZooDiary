import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
// css
import '@assets/fonts/font.css';
import 'swiper/css';
import 'swiper/css/pagination';
// stackflow
import { Stack } from 'stackflow';
import '@stackflow/plugin-basic-ui/index.css';
// component

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline />
        <Stack />
    </React.StrictMode>,
);
