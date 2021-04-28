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
const defaultImg = document.getElementById('defaultImg');

const preview = document.getElementById('preview');

// window.onload(() => {
//   const reader = new FileReader();
//   reader.onload = (function (aImg) {
//     return function (e) {
//       aImg.src = e.target.result;
//     };
//   })(previewImg);
//   reader.readAsDataURL(file);
// })

function handleFiles(file) {
  defaultImg.remove();
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

function getBlob(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function (event) {
      var blob = xhr.response;
      resolve(blob);
    };
    xhr.onerror = reject();
    xhr.open('GET', url);
    xhr.send();
  });
}

function storageURLForPhoto(oldURL, newName) {
  getBlob(oldURL)
    .then(function (blob) {
      var picRef = firebase.storage().ref().child(newName);
      return picRef.put(blob);
    })
    .then(function (snapshot) {
      return snapshot.downloadURL;
    })
    .catch(function (e) {
      console.log(e);
    });
}

// SIGN-UP
const signUpBtn = document.getElementById('signUp');
signUpBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const emailInputValue = document.getElementById('email').value;
  const passwordInputValue = document.getElementById('password').value;
  const defaultImg = document.getElementById('defaultImg');
  console.log(emailInputValue, passwordInputValue);

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInputValue, passwordInputValue)
    .then((userCredential) => {
      if (file == undefined) {
        // file = storageURLForPhoto(
        //   'https://images.unsplash.com/photo-1606233980284-b661d12ef876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        //   'profile.jpg'
        // );

        fetch(defaultImg.src)
          .then((res) => res.blob())
          .then((blob) => {
            file = new File([blob], 'dot.png', blob);
            console.log(file);
          })
          .then(() => {
            firebase
              .storage()
              .ref(`users/${userCredential.user.uid}/profile.jpg`)
              .put(file)
              .then(() => {
                return db.collection('users').doc(userCredential.user.uid).set({
                  name: signupForm['signup-name'].value,
                  userID: userCredential.user.uid,
                });
              });
          });
      } else {
        console.log(file);
        firebase
          .storage()
          .ref(`users/${userCredential.user.uid}/profile.jpg`)
          .put(file)
          .then(() => {
            return db.collection('users').doc(userCredential.user.uid).set({
              name: signupForm['signup-name'].value,
              userID: userCredential.user.uid,
            });
          });
      }

      // .then(() => (window.location = './confirmation.html'));
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
