import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBmTrmgnWacfKBUljH5qQI5iq9VaTVwTls',
  authDomain: 'jtkstaffing.firebaseapp.com',
  databaseURL: 'https://jtkstaffing.firebaseio.com',
  projectId: 'jtkstaffing',
  storageBucket: 'jtkstaffing.appspot.com',
  messagingSenderId: '121454074151',
  appId: '1:121454074151:web:860d9ce6fd5be066307102',
  measurementId: 'G-EKXVRKRKD3'
}
firebase.initializeApp(config)

export default firebase
