export const environment = {
  production: false,
  api: {
    url: 'https://us-central1-lucianogoncalves-blog.cloudfunctions.net'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCOUfR6ClMx0ZmeV1KI_sv4NsyvEuDMI2w",
    authDomain: "lucianogoncalves-blog.firebaseapp.com",
    databaseURL: "https://lucianogoncalves-blog.firebaseio.com",
    projectId: "lucianogoncalves-blog",
    storageBucket: "lucianogoncalves-blog.appspot.com",
    messagingSenderId: "778842732551",
    appId: "1:778842732551:web:bc6f24831a29d4d0da12a2"
  },
  constants: {
    jwtTokenKey: "JwtToken",
    jwtTokenExpKey: "JwtTokenExp"
  }
};