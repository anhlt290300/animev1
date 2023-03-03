import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "./firebaseConfig";

const createNewAnimeCollection = async (anime_title, anime_episode) => {
  const docRef = doc(db_firestore, anime_title, anime_episode);
  try {
    if ((await getDoc(docRef)).data() === undefined) {
      await setDoc(docRef, {
        listUserLike: [],
        listComments: {
          comment:[]
        },
      });
    } else {
    }
  } catch (e) {}
};

const handleToggleLikeEpisode = async (
  anime_title,
  anime_episode,
  user_id,
  isLikeNow
) => {
  try {
    createNewAnimeCollection(anime_title, anime_episode);
    //console.log(isFavoriteNow);
    const LikeRef = doc(db_firestore, anime_title, anime_episode);
    if (!isLikeNow) {
      await updateDoc(LikeRef, {
        listUserLike: arrayUnion(user_id),
      });
      return { key: "correct", data: "add" };
    } else {
      const res = await getDoc(LikeRef);
      const listUserLike = res.data()?.listUserLike;
      const index = listUserLike.indexOf(user_id);
      if (index - 1) {
        listUserLike.splice(index, 1);
      }
      //// change
      await updateDoc(LikeRef, {
        listUserLike: listUserLike,
      });
      return { key: "correct", data: "remove" };
    }
  } catch (error) {
    return { key: "error", data: error.code };
  }
};

const getNumberLikeEpisode = async (anime_title, anime_episode) => {
  const docRef = doc(db_firestore, anime_title, anime_episode);
  try {
    createNewAnimeCollection(anime_title, anime_episode);
    try {
      const list = await getDoc(docRef);
      //console.log(list.data().listUserLike)
      return {
        key: "correct",
        data: list.data().listUserLike,
      };
    } catch (e) {
      return {
        key: "error",
        data: e?.code,
      };
    }
  } catch (e) {
    return {
      key: "error",
      data: e?.code,
    };
  }
};

const isLikeEpisode = async (anime_title, anime_episode, user_id) => {
  const docRef = doc(db_firestore, anime_title, anime_episode);
  try {
    createNewAnimeCollection(anime_title, anime_episode);
    try {
      const list = await getDoc(docRef);
      //console.log(list.data())
      if (list.data().listUserLike.find((e) => e === user_id) !== undefined)
        return {
          key: "correct",
          data: true,
        };
      else {
        return {
          key: "correct",
          data: false,
        };
      }
    } catch (e) {
      return {
        key: "error",
        data: e?.code,
      };
    }
  } catch (e) {
    return {
      key: "error",
      data: e?.code,
    };
  }
};

export {
  handleToggleLikeEpisode,
  createNewAnimeCollection,
  getNumberLikeEpisode,
  isLikeEpisode,
};
