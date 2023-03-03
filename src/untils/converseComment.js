import { getUserById } from "../firebase/getUserById";

export const converseComment = async (listComment) => {
  
  if (listComment.length === undefined) {
    var list = listComment.comment;
  } else var list = listComment;
  try {
    var result = [];

    for (const item of list) {
      var res = await getUserById(item.user_id);
      result.push({
        comment: item.comment,
        day: item.day,
        time: item.time,
        name: res,
      });
    }
    return result;
  } catch (e) {
    console.log(e);

    return e;
  }
};
