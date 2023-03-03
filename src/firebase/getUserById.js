import { doc, getDoc } from "firebase/firestore";
import { db_firestore } from "./firebaseConfig";

export const getUserById = async (userID) => {
  var docRef = doc(db_firestore, "users", userID);
  try{
    const res = await getDoc(docRef)
    return res.data()?.name
  }catch(e){
    return null
  }
};
