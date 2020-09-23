import React from 'react';
import { Typography, Box, useTheme, Divider } from '@material-ui/core';

export default () => {
	const isManfen = /manfen/gi.test(location.hostname);

	return (
		<Box bgcolor='text.primary' color='background.paper' p={4} boxShadow={2}>
			<Typography variant='subtitle1' gutterBottom>
				{`${isManfen ? 'Manfen Tech' : 'Yao'} @${new Date().getFullYear()}`}
			</Typography>
			<br />
			<Typography variant='subtitle1'>Solution</Typography>
			<Typography variant='caption'>
				WebRTC protocol/realtime video streaming
				<br />
				Interactive E-Learning
				<br />
				React/Node/Cloud Integration
			</Typography>
			<br />
			<br />
			<Typography variant='subtitle1'>INC.</Typography>
			<Typography variant='caption'>
				{isManfen ? 'About' : 'About me'}
				<br />
				{isManfen ? 'Partners' : 'Social Medias'}
				<br />
				Careers
			</Typography>
		</Box>
	);
};
