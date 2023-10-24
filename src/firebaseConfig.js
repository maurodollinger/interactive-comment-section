import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDZH7uo2xnpPdZunO-9MyMlHYvgU45wvvk",
    authDomain: "react-fe-masters-comments.firebaseapp.com",
    databaseURL: 'https://react-fe-masters-comments-default-rtdb.firebaseio.com/', 
    projectId: "react-fe-masters-comments",
    storageBucket: "react-fe-masters-comments.appspot.com",
    messagingSenderId: "1073998161591",
    appId: "1:1073998161591:web:40a9df5a7d4983eff08f32",
    measurementId: "G-R93J9PJRV8"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { database };
