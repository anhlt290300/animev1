import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const handleLogin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { key: "correct", data: res };
  } catch (error) {
    return { key: "error", data: error.code };
  }
};

export { handleLogin };
