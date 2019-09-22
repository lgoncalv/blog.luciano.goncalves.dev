// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://localhost'
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
    jwtTokenKey: "JwtToken"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
