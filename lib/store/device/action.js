import TYPE from './action_type';

export const setDeviceWindowSizeCreator = (width, height, isCompact) => ({
    type: TYPE.SET_DEVICE_WINDOW_SIZE,
    width,
    height,
    isCompact,
});

export const setDeviceGeoLocationCreator = geoLocation => ({
    type: TYPE.SET_DEVICE_GEO_LOCATION,
    geoLocation,
});
