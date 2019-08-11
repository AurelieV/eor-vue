export const firebaseConfig = {
  apiKey: 'AIzaSyAEjaMLLL_VeuX9eyAqaLeMpll25Z7oTaE',
  authDomain: 'eor-beta-dev.firebaseapp.com',
  databaseURL: 'https://eor-beta-dev.firebaseio.com',
  projectId: 'eor-beta-dev',
  storageBucket: 'eor-beta-dev.appspot.com',
  messagingSenderId: '28941068774',
  appId: '1:28941068774:web:275f75044d4b622c',
}

export const authenticateUrl = '/api/authenticate'
export const authenticateSettings = {
  authority: 'https://apps.magicjudges.org/openid/',
  client_id: '495440',
  redirect_uri: 'http://localhost:4200/authent-redirect',
  post_logout_redirect_uri: 'http://localhost:4200',
  response_type: 'code',
  scope: 'openid profile dciprofile',
}
