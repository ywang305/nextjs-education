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
    speech: {
        volume: 1,
        rate: 1,
        pitch: 1,
        voice: null,
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
        case TYPE.SET_DEVICE_SPEECH: {
            const { option } = action;
            const speech = { ...myState.speech, ...option };
            return { ...myState, speech };
        }
        default:
            return myState;
    }
};
export default deviceReducer;
