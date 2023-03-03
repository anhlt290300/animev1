import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db_firestore } from "./firebaseConfig";

const handleGetComments = async (anime_title, episode) => {
  //console.log(episode);
  if (episode === undefined) {
    const docRef = doc(db_firestore, anime_title, "listComments");
    try {
      createNewAnimeComments(anime_title);
      try {
        const list = await getDoc(docRef);
        //console.log(list.data().listUserLike)
        return {
          key: "correct",
          data: list.data(),
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
  } else {
    //console.log('aaa')
    const docRef = doc(db_firestore, anime_title, episode);
    try {
      createNewAnimeComments(anime_title, episode);
      try {
        const list = await getDoc(docRef);
        //console.log(list.data().listUserLike)
        return {
          key: "correct",
          data: list.data(),
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
  }
};

const handleSubmitComment = async (
  anime_title,
  anime_episode,
  comment,
  user_id
) => {
  //console.log(anime_title + comment + user_id);
  var currentdate = new Date();
  var day =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  var time =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  try {
    createNewAnimeComments(anime_title, anime_episode);
    const commentRef = doc(db_firestore, anime_title, anime_episode);
    await updateDoc(commentRef, {
      comment: arrayUnion({
        user_id: user_id,
        comment: comment,
        time: time,
        day: day,
      }),
      listComments: arrayUnion({
        comment: {
          user_id: user_id,
          comment: comment,
          time: time,
          day: day,
        },
      }),
    });
    return { key: "correct", data: "add" };
  } catch (error) {
    return { key: "error", data: error.code };
  }
};

const createNewAnimeComments = async (anime_title, episode) => {
  if (episode === undefined) {
    const docRef = doc(db_firestore, anime_title, "listComments");
    try {
      if ((await getDoc(docRef)).data() === undefined) {
        await setDoc(docRef, {
          comment: [],
        });
      } else {
      }
    } catch (e) {}
  } else {
    const docRef = doc(db_firestore, anime_title, episode);
    try {
      if ((await getDoc(docRef)).data()?.listComments === undefined) {
        await setDoc(docRef, {
          listComments: {
            comment: [],
          },
          listUserLike: [],
        });
      } else {
        //console.log((await getDoc(docRef)).data()?.listComments === undefined ? 'a' : 'b');
      }
    } catch (e) {}
  }
};

export { handleGetComments, handleSubmitComment, createNewAnimeComments };
