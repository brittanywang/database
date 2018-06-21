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
  export default firebase;