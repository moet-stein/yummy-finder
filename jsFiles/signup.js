// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const db = firebase.firestore();

const signupForm = document.querySelector('#signupForm');

let file;

const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', (e) => {
  // // GET FILE
  file = e.target.files[0];

  // // // Create a sorage ref
  // // const sotrageRef = firebase.storage().ref(`profile_images/${file.name}`);
  // firebase
  //   .storage()
  //   .ref(`users/${userCredential.user.uid}/profile.jpg`)
  //   .put(file)
  //   .then(() => {
  //     console.log('successfully uploaded');
  //   });

  // // Upload File
  // const task = sotrageRef.put(file);
  // // update Progress bar
  // task.on(
  //   'state_changed',
  //   function progress(snapshot) {
  //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     uploader.value = percentage;
  //   },
  //   function error(err) {},
  //   function complete() {}
  // );
});
// SIGN-UP
const signUpBtn = document.getElementById('signUp');
signUpBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const emailInputValue = document.getElementById('email').value;
  const passwordInputValue = document.getElementById('password').value;
  console.log(emailInputValue, passwordInputValue);
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInputValue, passwordInputValue)
    .then((userCredential) => {
      firebase
        .storage()
        .ref(`users/${userCredential.user.uid}/profile.jpg`)
        .put(file)
        .then(() => {
          return db.collection('users').doc(userCredential.user.uid).set({
            name: signupForm['signup-name'].value,
            userID: userCredential.user.uid,
          });
        })
        .then(() => (window.location = './confirmation.html'));
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
