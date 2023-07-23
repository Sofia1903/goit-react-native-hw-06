import { auth, db } from '../firebase/config';
// import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, login }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`User ${user.uid} created`);
    const currentUser = auth.currentUser;
    await updateProfile(currentUser, { displayName: login });
    const formData = { login, email };
    formData.timestamp = serverTimestamp();
    await setDoc(doc(db, 'users', user.uid), formData);
    return user;
  }
);

export const signInwithEmail = createAsyncThunk(
  'auth/signinWithEmail',
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await signOut(auth);
});

export const authStateChanged = createAsyncThunk(
  'auth/authStateChanged',
  async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
      onChange(user);
    });
  }
);
