// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Login(sign in)
const loginFunc = () => {
  const loginBtn = document.getElementById('login');
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const emailInputValue = document.getElementById('email').value;
    const passwordInputValue = document.getElementById('password').value;
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInputValue, passwordInputValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        //   console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });
  // Add a real time listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var uid = user.uid;
      console.log(user);
      btnLogout.classList.remove('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });
};

if (document.title == 'YummyFinder-Login') {
  loginFunc();
}

const logoutFunc = () => {
  const btnLogout = document.getElementById('btnLogout');
  const btnLogoutSide = document.getElementById('btnLogoutSide');
  const btnLogin = document.getElementById('btnLogin');
  const btnLoginSide = document.getElementById('btnLoginSide');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });

  // Add a real time listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var uid = user.uid;
      console.log(user);
      btnLogout.classList.remove('hide');
      btnLogoutSide.classList.remove('hide');
      btnLogin.classList.add('hide');
      btnLoginSide.classList.add('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
      btnLogoutSide.classList.add('hide');
      btnLogin.classList.remove('hide');
      btnLoginSide.classList.remove('hide');
    }
  });
};

if (
  document.title == 'YummyFinder-Recipes' ||
  document.title == 'YummyFinder-Home' ||
  document.title == 'YummyFinder-Saved' ||
  document.title == 'YummyFinder-Videos'
) {
  logoutFunc();
}

// // Only logged-in user can save recipes
// if (document.title == "YummyFinder-Recipes") {
//     const callFuncWhenLoggedin = (func1, func2) => {
//       // Add a real time listener
//       firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/firebase.User
//           // var uid = user.uid;
//             func1();
//         } else {
//             func2();
//         }
//       });
//     }
// }
