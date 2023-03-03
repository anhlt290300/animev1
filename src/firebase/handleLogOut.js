import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const HandleLogOut = async () => {
  try {
    const res = await signOut(auth);
    console.log(res)
    return {
      key: "success",
    };
  } catch (e) {
    return {
      key: "error",
      data: e.code,
    };
  }
};
