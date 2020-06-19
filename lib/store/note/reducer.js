import TYPE from './action_type';

const initState = {
    speech: {
        volume: 1, // 0 - 1
        rate: 1, // 0.1 - 10
        pitch: 1, // 0 - 2
        voiceName: '',
    },
    note: null,
    setting: {
        single: false,
        annoOpen: false,
        paragIndex: 0,
    },
};

const deviceReducer = (myState = initState, action) => {
    switch (action.type) {
        case TYPE.SET_SPEECH_OPTION: {
            const { option } = action;
            return { ...myState, speech: option };
        }
        case TYPE.SET_NOTE: {
            const { note } = action;
            return { ...myState, note };
        }
        case TYPE.SET_NOTE_SETTING: {
            const { setting } = action;
            return { ...myState, setting };
        }
        case TYPE.SET_NOTE_COMMENTS: {
            const { parag_id, comments } = action;
            const paragraphs = myState.note?.paragraphs;
            const found = paragraphs?.find(p => p._id === parag_id);
            found.comments = comments;
            const note = { ...myState.note, paragraphs: [...paragraphs] };
            return { ...myState, note };
        }
        case TYPE.SET_NOTE_IMAGE_URLS: {
            const { parag_id, urls } = action;
            const paragraphs = myState.note?.paragraphs;
            const found = paragraphs?.find(p => p._id === parag_id);
            found.images = urls;
            const note = { ...myState.note, paragraphs: [...paragraphs] };
            return { ...myState, note };
        }
        default:
            return myState;
    }
};
export default deviceReducer;
