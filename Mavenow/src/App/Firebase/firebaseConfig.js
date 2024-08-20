import Firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCk-EiSxWJvM4f3kO8vHyzcYTOZIbwz8fA",
  authDomain: "reactmavenow.firebaseapp.com",
  databaseURL: "https://reactmavenow-default-rtdb.firebaseio.com/",
  projectId: "reactmavenow",
  storageBucket: "reactmavenow.appspot.com",
  messagingSenderId: "538397310158",
  appId: "1:538397310158:android:c64aa35ee73949a48e649f",
  measurementId: "G-WP3YWKQ6KE"
};

export default Firebase.initializeApp(firebaseConfig);

