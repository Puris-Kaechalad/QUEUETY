import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFirstName(userData.firstname);
          localStorage.setItem("userData", JSON.stringify({
            firstname: userData.firstname,
          }));
        }
      } else {
        setUser(null);
        setFirstName("");
        localStorage.removeItem("userData");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, firstName }}>
      {children}
    </UserContext.Provider>
  );
}
