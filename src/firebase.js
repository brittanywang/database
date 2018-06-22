import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDpT7cmB05TqAsrs9JJ-0KJQ-4V9vMiyek",
  authDomain: "database-test-8d870.firebaseapp.com",
  databaseURL: "https://database-test-8d870.firebaseio.com",
  projectId: "database-test-8d870",
  storageBucket: "database-test-8d870.appspot.com",
  messagingSenderId: "774948780277"
};
firebase.initializeApp(config);

//exports the auth module of Firebase + Google auth provider  
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;