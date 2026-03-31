import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

import { useTheme } from '@material-ui/core/styles';
import {
	TextField,
	Button,
	Snackbar,
	CardContent,
	Typography,
	CardActionArea,
	Card,
	CardMedia,
} from '@material-ui/core';
import Router, { useRouter } from 'next/router';

const LinkCard = ({ href, src, alt }) => {
	return (
		<Box
			minWidth={180}
			m={2}
			style={{
				background: '#12121a',
				border: '1px solid rgba(0, 240, 255, 0.15)',
				transition: 'all 0.3s ease',
				borderRadius: 2,
			}}
			className='cyber-glow'
		>
			<Link href={href}>
				<Button color='primary'>
					<Box display='flex' flexDirection='column'>
						<Box width={180} height={180}>
							<img
								alt={alt}
								src={src}
								style={{ objectFit: 'fill' }}
								height='100%'
								width='100%'
							/>
						</Box>
						<Typography gutterBottom variant='subtitle1' style={{ color: '#00f0ff' }}>
							{alt}
						</Typography>
					</Box>
				</Button>
			</Link>
		</Box>
	);
};

const ELearnPage = () => {
	const theme = useTheme();
	return (
		<Box
			display='flex'
			justifyContent='center'
			pt={theme.spacing(1)}
			flexWrap='wrap'
		>
			<LinkCard href='/note' src='/xgn.jpeg' alt='新概念英语学习笔记' />
			<LinkCard href='/spell' src='/spelling.jpg' alt='慢慢拼读帮手' />
		</Box>
	);
};

export default ELearnPage;
