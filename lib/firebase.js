import firebase from 'firebase/app';

const config = {
    apiKey: 'AIzaSyA_XXnAaX_pUY1KeUTfb5ST7jHxi6KrPsE',
    authDomain: 'techprobe-45982.firebaseapp.com',
    databaseURL: 'https://techprobe-45982.firebaseio.com',
    projectId: 'techprobe-45982',
    storageBucket: 'techprobe-45982.appspot.com',
    messagingSenderId: '667274460008',
    appId: '1:667274460008:web:1d498daac52a23a30274dd',
    measurementId: 'G-12VJY68EB6',
};

export default !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();
