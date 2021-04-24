// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const db = firebase.firestore();

const signupForm = document.querySelector('#signupForm');
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
      // Signed in
      return db.collection('users').doc(userCredential.user.uid).set({
        name: signupForm['signup-name'].value,
        userID: userCredential.user.uid,
      });
    })
    .then(() => {
      window.location = '../index.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
