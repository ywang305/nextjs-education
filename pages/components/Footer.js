import React from 'react';
import { Typography, Box, useTheme, Divider } from '@material-ui/core';
import { getIsManfen } from '../../lib/utils/isManfen';

const Footer = () => {
	const isManfen = getIsManfen();

	return (
		<Box
			style={{
				background: 'linear-gradient(180deg, #0d0d14 0%, #0a0a0f 100%)',
				borderTop: '1px solid rgba(0, 240, 255, 0.3)',
				boxShadow: '0 -2px 20px rgba(0, 240, 255, 0.08)',
			}}
			color='#e0e0ff'
			p={4}
		>
			<Typography variant='subtitle1' gutterBottom style={{ color: '#00f0ff' }}>
				{`${isManfen ? 'Manfen Tech' : 'Yao'} @${new Date().getFullYear()}`}
			</Typography>
			<br />
			<Typography variant='subtitle1' style={{ color: '#00f0ff' }}>Solution</Typography>
			<Typography variant='caption' style={{ color: '#8a8aad' }}>
				WebRTC protocol/realtime video streaming
				<br />
				Interactive E-Learning
				<br />
				React/Node/Cloud Integration
			</Typography>
			<br />
			<br />
			<Typography variant='subtitle1' style={{ color: '#00f0ff' }}>INC.</Typography>
			<Typography variant='caption' style={{ color: '#8a8aad' }}>
				{isManfen ? 'About' : 'About me'}
				<br />
				{isManfen ? 'Partners' : 'Social Medias'}
				<br />
				Careers
			</Typography>
		</Box>
	);
};

export default Footer;
