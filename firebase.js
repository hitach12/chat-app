import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage'; 



const firebaseConfig = {
  apiKey: "AIzaSyDVTg_LhbWPKUCAsP0NbpLazFRdn23dm0Y",
  authDomain: "chat-app-3bfa5.firebaseapp.com",
  projectId: "chat-app-3bfa5",
  storageBucket: "chat-app-3bfa5.appspot.com",
  messagingSenderId: "295055465545",
  appId: "1:295055465545:web:f402f79f7cc307c114f398",
  measurementId: "G-61DKMKN4SV"
};
  
let app
// const firebaseApp = 

if(firebase.apps.length===0){
app = firebase.initializeApp(firebaseConfig)
}else {
  app=firebase.app()
}
var db = app.firestore();
var auth = app.auth()
const storage = firebase.storage();

export {db , auth , storage };