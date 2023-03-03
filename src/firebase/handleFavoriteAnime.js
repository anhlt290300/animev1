import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "./firebaseConfig";

const handleToggleFavoriteAnime = async (id_anime, user_id, isFavoriteNow) => {
  console.log(id_anime, user_id, isFavoriteNow);
  try {
    //console.log(isFavoriteNow);
    const favoriteRef = doc(db_firestore, "users", user_id);
    if (!isFavoriteNow) {
      await updateDoc(favoriteRef, {
        listFavoriteAnime: arrayUnion(id_anime),
      });
      return { key: "correct", data: "add" };
    } else {
      const res = await getDoc(favoriteRef);
      const listFavoriteAnime = res.data()?.listFavoriteAnime;
      const index = listFavoriteAnime.indexOf(id_anime);
      //console.log(index);
      if (index > -1) {
        listFavoriteAnime.splice(index, 1);
      }
      await updateDoc(favoriteRef, {
        listFavoriteAnime: listFavoriteAnime,
      });
      return { key: "correct", data: "remove" };
    }
  } catch (error) {
    return { key: "error", data: error.code };
  }
};

const isFavoriteAnime = async (id_anime, user_id) => {
  try {
    const favoriteRef = doc(db_firestore, "users", user_id);
    const res = await getDoc(favoriteRef);
    const listFavoriteAnime = res.data()?.listFavoriteAnime;
    //console.log(listFavoriteAnime)
    //console.log(listFavoriteAnime)
    if (listFavoriteAnime.find((e) => e === id_anime) !== undefined) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export { handleToggleFavoriteAnime, isFavoriteAnime };
