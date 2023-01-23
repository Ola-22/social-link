import { createContext, useEffect, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentUserDetails, setCurrentUserDetails] = useState({});

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000`,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const getDataById = async () => {
    try {
      const headers = {
        accept: "application/json",
      };
      await axios
        .get(
          `https://sociallink-ab726-default-rtdb.firebaseio.com/users/${user?.uid}.json`,

          {
            headers: headers,
          }
        )
        .then((res) => {
          setCurrentUserDetails(res?.data);
          localStorage.setItem("currentUser", JSON.stringify(res?.data));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <userAuthContext.Provider
      value={{
        user,
        signIn,
        signOutUser,
        register,
        forgotPassword,
        getDataById,
        currentUserDetails,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuthContext() {
  return useContext(userAuthContext);
}
