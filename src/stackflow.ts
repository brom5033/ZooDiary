import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';

// Activity
import { Login } from './activities/Login';
import { SignUp } from './activities/SignUp';
import { Writing } from './activities/Writing';
import { Board } from './activities/Board';
import { MyPage } from './activities/MyPage';

export const { Stack, useFlow } = stackflow({
    transitionDuration: 350,
    plugins: [
        basicRendererPlugin(),
        basicUIPlugin({
            theme: 'cupertino',
        }),
    ],
    activities: {
        SignUp,
        Login,
        Writing,
        Board,
        MyPage,
    },
    initialActivity: () => 'Login',
});
