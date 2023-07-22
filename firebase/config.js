import { initializeApp } from 'firebase/app';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
// тут база даних після регістрації
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
// це можливість авторизації
// import 'firebase/auth';

const firebaseConfig = {
  apiKey : "AIzaSyDIabeYaJ0fTr8zqfVWcYq3nujkGfUjIa4" , 
  authDomain : "adde-267cb.firebaseapp.com" , 
  projectId : "adde-267cb" , 
  storageBucket : "adde-267cb.appspot.com" , 
  messagingSenderId : "83010446585" , 
  appId : "1:83010446585:web:6b9b3324e03233f7cfee28" , 
  measurementId: "G-67BJTXZJ6V"
  

};

export const app = initializeApp(firebaseConfig);

// initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);