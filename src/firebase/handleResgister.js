import { auth, db_firestore } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const handleRegister = async (fullname, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res.user?.metadata);
    await setDoc(doc(db_firestore, "users", res.user.uid), {
      uid: res.user.uid,
      name: fullname,
      email: email,
      password: password,
      creationTime: res.user.metadata.creationTime,
      lastSignInTime: res.user.metadata.lastSignInTime,
      listFavoriteAnime: [],
    });
    return { key: "correct", data: res };
  } catch (error) {
    return { key: "error", data: error.code };
  }
};

export { handleRegister };
