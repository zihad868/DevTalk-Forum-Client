import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../firebase/Firebase.Config";
import { createContext, useEffect, useState } from "react";

const auth = getAuth(app);

export const authContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleSignup = () => {
    return signInWithPopup(auth, googleProvider) 
  }

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  

  const authInfo = { 
    createUser, 
    googleSignup,
    updateUser,
    loading, 
    user 
  };

    console.log("Current User", user)

    useEffect(()=> {
      const unSubscribe = onAuthStateChanged(auth, (user) =>{
        setUser(user)
        setLoading(false)
      })
  
      return () => {
        unSubscribe()
      }
    }, [])

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
