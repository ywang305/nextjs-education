import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './components/ButtonAppBar';
import { useProfile } from './login/profile';
import { Typography, Box, useTheme, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { links } from './components/ButtonAppBar';
import Footer from './components/Footer';
import { getIsManfen } from '../lib/utils/isManfen';

const images = [
    'landing/consult.jpg',
    '/landing/webrtc.png',
    '/landing/elearn.jpg',
    '/landing/react.png',
    '/landing/nextmongo.png',
    '/landing/firebase.png',
    '/landing/azure.png',
    '/landing/reactjs-azure-signalr.jpg',
    '/landing/swiftui.jpg',
    '/landing/deno.jpg',
];

const Landing = () => {
    const isCompact = useSelector(state => state.device.window.isCompact);

    const isManfen = getIsManfen();

    return (
        <div>
            <Box
                display='flex'
                justifyContent='space-around'
                id='images'
                flexWrap='wrap'
                py={1}
            >
                {isManfen
                    ? images.map((url, i) => {
                          return (
                              <Box key={i} width={isCompact ? 1 : 0.5}>
                                  <img src={url} alt={url} width='100%' />
                              </Box>
                          );
                      })
                    : links
                          .filter(lk => /external/i.test(lk.scope))
                          .map(({ name, link, image, description }) => (
                              <Box
                                  key={name}
                                  maxWidth={isCompact ? 1 : 0.45}
                                  p={2}
                                  my={2}
                                  style={{
                                      background: '#12121a',
                                      border: '1px solid rgba(0, 240, 255, 0.15)',
                                      transition: 'all 0.3s ease',
                                      borderRadius: 2,
                                  }}
                                  className='cyber-glow'
                              >
                                  <a
                                      href={link}
                                      style={{ textDecoration: 'none', color: '#e0e0ff' }}
                                  >
                                      <Typography variant='h6' style={{ color: '#00f0ff', marginBottom: 8 }}>{name}</Typography>
                                      <img
                                          src={image}
                                          alt={image}
                                          width='100%'
                                      />
                                      <Typography variant='body2' style={{ color: '#8a8aad', marginTop: 8 }}>{description}</Typography>
                                  </a>
                              </Box>
                          ))}
            </Box>
            <Footer />
        </div>
    );
};

export default Landing;
