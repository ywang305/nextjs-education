import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './components/ButtonAppBar';
import { useProfile } from './login/profile';
import { Typography, Box, useTheme, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

const images = [
  'landing/consult.jpg',
  '/landing/webrtc.png',
  '/landing/elearn.jpg',
  '/landing/react.png',
  '/landing/nextmongo.png',
  '/landing/firebase.png',
  '/landing/azure.png',
  '/landing/cloud.jpg',
  '/landing/swiftui.jpg',
  '/landing/deno.jpg',
];

const Landing = () => {
  const isCompact = useSelector((state) => state.device.window.isCompact);
  return (
    <div>
      <Box
        display='flex'
        justifyContent='center'
        id='imgaes'
        flexWrap='wrap'
        py={1}
      >
        {images.map((url, i) => {
          return (
            <Box key={i} width={isCompact ? 1 : 0.5}>
              <img src={url} alt={url} width='100%' height='100%' />
            </Box>
          );
        })}
      </Box>
      <Box bgcolor='text.primary' color='background.paper' p={4} boxShadow={2}>
        <Typography variant='subtitle1' gutterBottom>
          {`Manfen Tech @${new Date().getFullYear()}`}
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
          About
          <br />
          Partners
          <br />
          Careers
        </Typography>
      </Box>
    </div>
  );
};

export default Landing;
