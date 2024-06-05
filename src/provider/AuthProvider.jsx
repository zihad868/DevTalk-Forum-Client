import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/Firebase.Config";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from '../hooks/useAxiosPublic';

const auth = getAuth(app);

export const authContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignup = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    googleSignup,
    signInEmail,
    updateUser,
    signOutUser,
    loading,
    user,
  };

  console.log("Current User", user);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user?.email);
      if (user) {
        const userInfo = { email: user?.email };
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if(res.data.token){
             localStorage.setItem('access-token', res.data.token);
             setLoading(false);
          }
          else{
            console.error('jwt token not found')
          }
        })
        .catch(error => {
           console.error("jwt token error", error)
        })
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
      
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
