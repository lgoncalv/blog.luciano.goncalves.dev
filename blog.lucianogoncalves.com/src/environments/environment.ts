// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://localhost:5001/api'
  },
  firebird: {
    apiKey: "AIzaSyCOUfR6ClMx0ZmeV1KI_sv4NsyvEuDMI2w",
    authDomain: "lucianogoncalves-blog.firebaseapp.com",
    databaseURL: "https://lucianogoncalves-blog.firebaseio.com",
    projectId: "lucianogoncalves-blog",
    storageBucket: "lucianogoncalves-blog.appspot.com",
    messagingSenderId: "778842732551"
  },
  constants: {
    jwtTokenKey: "JwtToken"
  }
};
