import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';
// component
import { Box } from '@components/Box';
import { AppScreen } from '@components/AppScreen';

export const MyPage: ActivityComponentType = () => {
	return <AppScreen logout></AppScreen>;
};