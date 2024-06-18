// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase,ref,set,get,child} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5UD-mLtXlyeHi-hPztJJcZwYta7O6fps",
  authDomain: "proyectico-8a957.firebaseapp.com",
  projectId: "proyectico-8a957",
  storageBucket: "proyectico-8a957.appspot.com",
  messagingSenderId: "79815865631",
  appId: "1:79815865631:web:8a2d22de103c9625e1ec2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("god00");
// Initialize Firebase
const db=getDatabase(app);
document.getElementById("submit").addEventListener("click", function(e){
set (ref(db, 'user/' + document.getElementById("username"). value),
{
  username: document. getElementById("username"). value,
  
})
  
})