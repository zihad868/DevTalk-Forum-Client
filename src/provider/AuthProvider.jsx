import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/Firebase.Config";
import { createContext, useState } from "react";

const auth = getAuth(app);
export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = { createUser, loading };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
