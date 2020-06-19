import TYPE from './action_type';

const initState = {
    window: { width: undefined, height: undefined, isCompact: false },
    geoLocation: {
        loading: false,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 40.754888,
        longitude: -73.956298,
        speed: null,
        timestamp: null,
    },
};

const deviceReducer = (myState = initState, action) => {
    switch (action.type) {
        case TYPE.SET_DEVICE_WINDOW_SIZE: {
            const { width, height, isCompact } = action;
            return {
                ...myState,
                window: { ...myState.window, width, height, isCompact },
            };
        }
        case TYPE.SET_DEVICE_GEO_LOCATION: {
            const { geoLocation } = action;
            return { ...myState, geoLocation };
        }

        default:
            return myState;
    }
};
export default deviceReducer;
