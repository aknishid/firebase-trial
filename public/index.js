const { initializeApp } = require('firebase-admin/app');
initializeApp({
  credential: applicationDefault(),
});
function signout() {
    firebase.auth().signOut()
      .then(() => {
        console.log('Signed out')
      })
  }
  let idToken;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user",user)
      console.log("firebase.auth().currentUser",firebase.auth().currentUser)
      console.log(firebase.auth().currentUser.getIdToken()
      .then((token)=>{
        console.log("token", token);
        idToken = token;
      }))

      getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log("uid", uid)
        // ...
      })
      .catch((error) => {
        // Handle error
      });
      // TODO： user.getIdTokenみたいな関数で取れるtokenを使ってfirestoreに登録できるようにする
      // https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja#web
      document.getElementById('sign-in-status').innerText = `Signed in`
      document.getElementById('sign-out').style.display = 'block'
    } else {
      document.getElementById('sign-in-status').innerText = 'Signed out'
      document.getElementById('sign-out').style.display = 'none'
    }
  })

  
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  console.log(typeof ui)
  ui.start('#firebaseui-auth-container', {
    signInFlow: 'popup',
    signInSuccessUrl: './',
    signInOptions: [
      // プロバイダーの設定
      {
        // provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, //メールアドレス認証のとき
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, //google認証のとき
        requireDisplayName: false
      },
    ]
  });