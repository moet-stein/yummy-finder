// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const profileImage = document.getElementById('profileImage');
const confMessage = document.getElementById('confMessage');

let userName;
let userID;
// Get username from 'users' collection

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    userID = user.uid;
  } else {
    userID = '';
  }
});
// Get username from 'users' collection
db.collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (userID === doc.data().userID) {
        userName = doc.data().name;
      }
    });
  })
  .then(() => {
    // Add a real time listener
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .storage()
          .ref(`users/${user.uid}/profile.jpg`)
          .getDownloadURL()
          .then((imgUrl) => {
            confMessage.innerHTML = `Thank you for signing up, ${userName} 🧡`;
            profileImage.setAttribute('src', imgUrl);
          });
      }
    });
  });
