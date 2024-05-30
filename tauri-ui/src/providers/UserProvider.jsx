import React, { useState, useEffect, createContext, useRef } from "react";
import { auth } from "../services/firebase";

export const UserContext = createContext({ user: null, setUser: () => {} });

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (isMounted.current) {
        if (user) {
          const { displayName, email } = user;
          setUser({
            displayName,
            email,
          });
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
