import {initializeApp} from 'firebase/app';
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCp4kBnSFgLIlID5tY9mJi2IvdEF0O_8hM",
    authDomain: "my-todo-list-womanup.firebaseapp.com",
    databaseURL: 'gs://my-todo-list-womanup.appspot.com',
    projectId: "my-todo-list-womanup",
    storageBucket: "my-todo-list-womanup.appspot.com",
    messagingSenderId: "511143956182",
    appId: "1:511143956182:web:2548fb3eb7241bd8edc377"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
