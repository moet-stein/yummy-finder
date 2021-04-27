// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Login(sign in)
const loginFunc = () => {
  const loginBtn = document.getElementById('login');
  const errorP = document.getElementById('errorP');

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
        errorP.innerHTML = errorMessage;
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

      if (document.title == 'YummyFinder-Login') {
        window.location = '../index.html';
      }
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });
};

const logoutFunc = () => {
  const btnLogout = document.getElementById('btnLogout');
  const btnLogoutSide = document.getElementById('btnLogoutSide');
  const btnLogin = document.getElementById('btnLogin');
  const btnLoginSide = document.getElementById('btnLoginSide');
  const acountImage = document.getElementById('acountImage');
  const sideAcountImage = document.getElementById('sideAcountImage');
  const sideImg = document.getElementById('sideImg');

  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
  btnLogoutSide.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });

  // Add a real time listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .storage()
        .ref(`users/${user.uid}/profile.jpg`)
        .getDownloadURL()
        .then((imgUrl) => {
          console.log('i am supposed to show image');
          acountImage.setAttribute('src', imgUrl);
          sideImg.setAttribute('src', imgUrl);
        });
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var uid = user.uid;
      console.log(user);
      btnLogout.classList.remove('hide');
      btnLogoutSide.classList.remove('hide');
      acountImage.classList.remove('hide');
      sideAcountImage.classList.remove('hide');
      btnLogin.classList.add('hide');
      btnLoginSide.classList.add('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
      btnLogoutSide.classList.add('hide');
      acountImage.classList.add('hide');
      sideAcountImage.classList.add('hide');
      btnLogin.classList.remove('hide');
      btnLoginSide.classList.remove('hide');
      if (document.title == 'YummyFinder-Saved') {
        cards.innerHTML = '';
        noFavorites.classList.remove('hidden');
        savedRecipesUserName.classList.add('hidden');
      }
    }
  });
};

if (document.title == 'YummyFinder-Login') {
  loginFunc();
}

if (
  document.title == 'YummyFinder-Recipes' ||
  document.title == 'YummyFinder-Home' ||
  document.title == 'YummyFinder-Saved' ||
  document.title == 'YummyFinder-Videos'
) {
  logoutFunc();
}
