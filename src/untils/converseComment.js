import { getUserById } from "../firebase/getUserById";

export const converseComment = async (listComment) => {
  try {
    var result = [];

    for (const item of listComment) {
      var res = await getUserById(item.user_id);
      result.push({
        comment: item.comment,
        day: item.day,
        time: item.time,
        name: res,
      });
    }
    // console.log(result)
    return result;
  } catch (e) {
    return e;
  }
};
