import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './components/ButtonAppBar';
import { useProfile } from './login/profile';
import { Typography, Box, useTheme, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { links } from './components/ButtonAppBar';
import Footer from './components/Footer';

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

    const isManfen = /manfen/gi.test(location.hostname);

    return (
        <div>
            <Box
                display='flex'
                justifyContent='space-around'
                id='imgaes'
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
                                  boxShadow={3}
                                  borderRadius={16}
                              >
                                  <a
                                      href={link}
                                      style={{ textDecoration: 'none' }}
                                  >
                                      <h3>{name}</h3>
                                      <img
                                          src={image}
                                          alt={image}
                                          width='100%'
                                      />
                                      <p>{description}</p>
                                  </a>
                              </Box>
                          ))}
            </Box>
            <Footer />
        </div>
    );
};

export default Landing;
