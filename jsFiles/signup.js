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

const preview = document.getElementById('preview');

function handleFiles(file) {
  preview.innerHTML = '';

  const previewImg = document.createElement('img');
  previewImg.classList.add('preview-obj');
  previewImg.file = file;
  preview.appendChild(previewImg); // Assuming that "preview" is the div output where the content will be displayed.

  const reader = new FileReader();
  reader.onload = (function (aImg) {
    return function (e) {
      aImg.src = e.target.result;
    };
  })(previewImg);
  reader.readAsDataURL(file);
}

fileButton.addEventListener('change', (e) => {
  // // GET FILE
  file = e.target.files[0];
  handleFiles(file);
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
