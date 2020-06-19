import fetchAsync from '../../fetchAsync';
import TYPE from './action_type';

export const setSpeechOptionCreator = option => ({
    type: TYPE.SET_SPEECH_OPTION,
    option,
});
export const setNoteCreator = note => ({
    type: TYPE.SET_NOTE,
    note,
});

export const setNoteSettingCreator = setting => ({
    type: TYPE.SET_NOTE_SETTING,
    setting,
});
export const setNoteCommentsCreator = (parag_id, comments) => ({
    type: TYPE.SET_NOTE_COMMENTS,
    parag_id,
    comments,
});
export const setNoteImageUrlsCreator = (parag_id, urls) => ({
    type: TYPE.SET_NOTE_IMAGE_URLS,
    parag_id,
    urls,
});

export function getNoteThunk(note_id) {
    return async dispatch => {
        const url = '/api/note/' + note_id;
        const note = await fetchAsync(url);
        dispatch(setNoteCreator(note));
    };
}

export function postCommentsThunk(note_id, parag_id, addedComments) {
    return async dispatch => {
        const comments = await fetchAsync('/api/note/comment', {
            method: 'POST',
            body: {
                note_id,
                parag_id,
                comments: addedComments,
            },
        });
        dispatch(setNoteCommentsCreator(parag_id, comments));
    };
}

export function postImageUrlsThunk(note_id, parag_id, addedURLs) {
    return async dispatch => {
        const urls = await fetchAsync('/api/note/image', {
            method: 'POST',
            body: {
                note_id,
                parag_id,
                urls: addedURLs,
            },
        });
        dispatch(setNoteImageUrlsCreator(parag_id, urls));
    };
}
