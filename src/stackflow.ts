import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
// Activity
import { Login, SignUp, Writing, Board, MyPage } from '@activities/index';

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
    initialActivity: () => 'Board',
});
