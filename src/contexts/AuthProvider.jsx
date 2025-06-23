"use client";

import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error; // rethrow the error to be handled in the calling function
    } finally {
      setLoading(true);
    }
  };

  //   update profile
  const updateUserProfile = async (profile) => {
    setLoading(true);
    try {
      return await updateProfile(auth.currentUser, profile);
    } catch (error) {
      throw error; // rethrow the error to be handled in the calling function
    } finally {
      setLoading(false);
    }
  };

  //   login
  const logIn = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error; // rethrow the error to be handled in the calling function
    } finally {
      setLoading(false);
    }
  };

  //  google login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      return await signInWithPopup(auth, provider); // Ensure this is being used correctly for your local setup
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //   logout
  const logout = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } catch (error) {
      throw error; // rethrow the error to be handled in the calling function
    } finally {
      setLoading(false);
    }
  };

  //   user profile all over the site
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    updateUserProfile,
    logIn,
    googleLogin,
    logout,
    loading,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
