import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import {
  createNewAnimeComments,
  handleGetComments,
  handleSubmitComment,
} from "../firebase/handleCommentsAnime";
import { converseComment } from "../untils/converseComment";

const Comment = ({ anime_title, anime_episode }) => {
  const [listComment, setListComment] = useState([]);
  const [comment, setComment] = useState("");

  const isLogin =
    JSON.parse(localStorage.getItem("user_id")) !== null ? true : false;
  //console.log(isLogin);
  useEffect(() => {
    (async () => {
      await converseComment(
        (
          await handleGetComments(anime_title, anime_episode)
        )?.data
      )
        .then((res) => {
          setListComment(res.reverse());
          //console.log(res );
        })
        .catch((e) => {
          console.log(e);
        });
    })();
    return () => {};
  }, []);

  const SubmitComment = async () => {
    if (comment.length === 0) {
      alert("Ban chua nhap gi");
    } else {
      try {
        await handleSubmitComment(
          anime_title,
          anime_episode,
          comment,
          JSON.parse(localStorage.getItem("user_id"))
        )
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {});

        await converseComment(
          (
            await handleGetComments(anime_title, anime_episode)
          )?.data?.comment
        )
          .then((res) => {
            console.log(res);
            setListComment(res.reverse());
            setComment("");
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {}
    }
  };
  return (
    <div className="w-full text-white mt-8 desktop-L:p-12 desktop-L:py-8 desktop:py-8 tablet:p-12 mobile-M:px-6 mobile-S:px-4 mobile-L:py-8 mobile-S:py-4 bg-gray-500 m-auto">
      {isLogin ? (
        <div className="flex">
          <img
            src="https://i.redd.it/yb44vmeyk6t91.jpg"
            alt=""
            className="w-16 h-16"
          />
          <div className="ml-4 w-full">
            <TextareaAutosize
              className=" text-black w-full outline-none px-2 py-3"
              placeholder="Write something ..."
              onChange={(e) => {
                setComment(e.target.value);
                //console.log(comment);
              }}
              value={comment}
            />
            <div className="w-full bg-gray-300 relative flex justify-end">
              <button
                onClick={() => SubmitComment()}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    SubmitComment();
                  }
                }}
                className="bg-black my-3 mx-2 p-2 rounded transition-all duration-150 ease-linear hover:shadow-lightRounder hover:-translate-y-1"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 bg-black text-white">
          <p className=" animate-bounce">Login to comment ...</p>
        </div>
      )}
      <p className=" font-semibold my-4">
        <span>{listComment.length}</span> Comments
      </p>

      {listComment.length !== 0 &&
        listComment?.map((item, index) => {
          return (
            <div className="flex my-4" key={index}>
              <img
                src="https://i.redd.it/yb44vmeyk6t91.jpg"
                alt=""
                className="w-16 h-16"
              />
              <div className="ml-4 w-full">
                <p className="text-black font-semibold text-lg">{item.name}</p>
                <p>{item.comment}</p>
                <div className="flex justify-between text-black mt-4">
                  <p>{item.day}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

Comment.propTypes = {
  anime_title: PropTypes.string.isRequired,
  anime_episode: PropTypes.string,
};

export default Comment;
