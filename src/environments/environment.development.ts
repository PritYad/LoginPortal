const firebaseConfig = {
  apiKey: 'AIzaSyD5VFvwGMVHKr4MaadruWb8Cb1zDamuD2I',
  authDomain: 'testouth-56cd3.firebaseapp.com',
  projectId: 'testouth-56cd3',
  storageBucket: 'testouth-56cd3.appspot.com',
  messagingSenderId: '396589927826',
  appId: '1:396589927826:web:e1461f42f38fa09ab5054b',
};

const googleConfig = {
  clientId:
    '396589927826-ve896vv48gh6k8lt0ohm5osd9moava09.apps.googleusercontent.com',
};

export const environment = {
  firebaseConfig,
  googleConfig,
  signInWithGoogleApi: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${googleConfig.clientId}`,
};
