import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyCUHR98Yg58-k0uXBlQZelIb5nDEkbZYzE",
    authDomain: "bt3103-week-6-d52ba.firebaseapp.com",
    projectId: "bt3103-week-6-d52ba",
    storageBucket: "bt3103-week-6-d52ba.appspot.com",
    messagingSenderId: "277265487087",
    appId: "1:277265487087:web:11fb91510bc6057713f71a",
    measurementId: "G-BRJF80Y051"
  };
 
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;