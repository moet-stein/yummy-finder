// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();

let file;

const fileButton = document.getElementById('fileButton');
const defaultImg = document.getElementById('defaultImg');
const preview = document.getElementById('preview');
const signupForm = document.querySelector('#signupForm');

// uploading input image as a file and show on browser as preview
const handleFiles = (file) => {
  defaultImg.remove();
  preview.innerHTML = '';

  const previewImg = document.createElement('img');
  previewImg.classList.add('preview-obj');
  previewImg.file = file;
  preview.appendChild(previewImg);

  const reader = new FileReader();
  reader.onload = (function (aImg) {
    return function (e) {
      aImg.src = e.target.result;
    };
  })(previewImg);
  reader.readAsDataURL(file);
};

// Listening to the uploaded file every time it's uploaded
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
  // const defaultImg = document.getElementById('defaultImg');
  console.log(emailInputValue, passwordInputValue);

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInputValue, passwordInputValue)
    .then((userCredential) => {
      // If there is no file uploaded by the user, create a file from the defaulImg's src and store the file(image) in firestore storage with userId
      if (file == undefined) {
        fetch(defaultImg.src)
          .then((res) => res.blob())
          .then((blob) => {
            file = new File([blob], 'dot.png', blob);
            console.log(file);
          })
          .then(() => {
            storeInStorage(userCredential);
          });
        // If the user uploaded a profile image, just get the file object that was created when the user uploaded it.
      } else {
        console.log(file);
        storeInStorage(userCredential);
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

const storeInStorage = (userCredential) => {
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
};
