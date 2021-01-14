import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAyrDVf-V_oEhROvPAnChO0PA5BmMwrCkU",
    authDomain: "geofence-e870a.firebaseapp.com",
    // databaseURL: YOUR_DATABASE_URL,
    projectId: "geofence-e870a",
    storageBucket: "geofence-e870a.appspot.com",
    messagingSenderId: "350389505343",
    appId: "1:350389505343:web:cbf62c61b090de65a7578a",
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
  }
   
  export default Firebase;