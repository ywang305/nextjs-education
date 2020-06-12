import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowSize from 'react-use/lib/useWindowSize';
import useGeolocation from 'react-use/lib/useGeolocation';
import {
    setDeviceWindowSizeCreator,
    setDeviceGeoLocationCreator,
} from './action';

const useDevice = () => {
    const dispatch = useDispatch();
    const { width, height } = useWindowSize();
    const geoLocation = useGeolocation();
    const { latitude, longitude } = geoLocation;

    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('xs')); // [0...sm]

    useEffect(() => {
        dispatch(setDeviceWindowSizeCreator(width, height, isCompact));
    }, [width, height]);
    // useEffect(() => {
    //   dispatch(setDeviceGeoLocationCreator(geoLocation));
    // }, [latitude, longitude]);

    return [];
};
export default useDevice;
