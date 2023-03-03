import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IsLoad from "./IsLoad";
// import ReactHlsPlayer from "react-hls-player";
import Comment from "./Comment";
import {
  getNumberLikeEpisode,
  handleToggleLikeEpisode,
  isLikeEpisode,
} from "../firebase/handleLikeEpisode";

const MovieWatch = () => {
  var { animeTitle, episode } = useParams();

  const navigate = useNavigate();

  const [source, setSource] = useState(null);

  const [sourceBK, setSourceBK] = useState(null);

  const [listEpisode, setlistEpisode] = useState(null);

  const [turnOff, setTurnOff] = useState(false);

  const [pageError, setPageError] = useState(false);

  const [numberLike, setNumberLike] = useState(-1);

  const [isLike, setIsLike] = useState(false);

  const param = useParams();

  //console.log(param.episode);

  useEffect(() => {
    (async () => {
      await getNumberLikeEpisode(animeTitle, episode)
        .then((res) => {
          if (res.data === undefined) setNumberLike(0);
          else setNumberLike(res.data.length);
        })
        .catch((e) => {
          alert(e);
        });

      await isLikeEpisode(
        animeTitle,
        episode,
        JSON.parse(localStorage.getItem("user_id"))
      )
        .then((res) => {
          if (res.key !== "error") {
            setIsLike(res.data);
          } else {
            alert(res.data);
          }
        })
        .catch((e) => {
          alert(e);
        });
    })();
    return () => {};
  }, [param.episode]);

  useEffect(() => {
    if (turnOff) {
      window.scrollTo(0, 0);
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    } else {
      window.onscroll = function () {};
    }
  }, [turnOff]);

  useEffect(() => {
    if (pageError) {
      navigate("/error-page");
    }
  }, [pageError]);

  useEffect(() => {
    axios
      .get(`https://gogoanime.consumet.stream/vidcdn/watch/${episode}`)
      .then((res) => {
        //console.log(res.data);
        setSource(res.data?.sources);
        setSourceBK(res.data?.sources_bk);
      })
      .catch((error) => {
        console.log("aaa" + error);
        setTimeout(() => {
          setPageError(true);
        }, 300);
      });

    axios
      .get(`https://gogoanime.consumet.stream/anime-details/${animeTitle}`)
      .then((res) => {
        //console.log(res.data);
        const arr = res.data.episodesList;

        setlistEpisode(arr.reverse());
      })
      .catch((error) => {
        console.log("aaa");
        setTimeout(() => {
          setPageError(true);
        }, 1000);
      });
  }, [episode, param.episode]);

  const toggleLike = async () => {
    if (JSON.parse(localStorage.getItem("user_id")) !== null) {
      await handleToggleLikeEpisode(
        animeTitle,
        episode,
        JSON.parse(localStorage.getItem("user_id")),
        isLike
      )
        .then((res) => {
          if (res.key !== "error") {
            if (res.data === "add") {
              alert("+1 Like");
              setNumberLike((numberLike) => numberLike + 1);
            } else {
              alert("-1 Like");
              setNumberLike((numberLike) => numberLike - 1);
            }
          } else {
            alert(res.data);
          }
        })
        .catch((e) => {});
    } else {
      alert("dang nhap de like");
    }
  };

  if (source !== null)
    return (
      <div className=" desktop:w-2/3 tablet:w-2/3 mobile:w-4/5 w-full flex flex-col justify-center items-center mx-auto">
        {!turnOff ? (
          <div className=" w-full ">
            {/* <ReactHlsPlayer
              className="mt-12 overflow-hidden"
              src={source[0].file}
              autoPlay={false}
              controls={true}
              width="100%"
              height="auto"
            /> */}
          </div>
        ) : (
          <div className="w-screen relative">
            <div
              onClick={() => setTurnOff(false)}
              className="w-screen h-screen absolute top-0 left-0 z-10 transition-all duration-200 ease-in-out bg-[rgba(0,0,0,0.8)] cursor-pointer"
            />
            {/* <ReactHlsPlayer
              className="mt-12 overflow-hidden w-5/6 mobile:w-4/5 tablet:w-3/5 absolute top-0 left-1/2 -translate-x-1/2 z-30 shadow-lightRounder animate-screenOpen"
              src={source[0].file}
              autoPlay={false}
              controls={true}
              width="100%"
              height="auto"
            /> */}
          </div>
        )}

        {turnOff ? (
          <div className="mt-[35rem] w-full tablet:text-xl mobile-L:text-lg text-xs text-white font-semibold my-4">
            <span className="capitalize text-red-500">{animeTitle}</span> -{" "}
            <span className="capitalize">{episode}</span>
          </div>
        ) : (
          <div className=" w-full tablet:text-xl mobile-L:text-lg text-base text-white font-semibold my-4">
            <span className="capitalize text-red-500">{animeTitle}</span> -{" "}
            <span className="capitalize">{episode}</span>
          </div>
        )}

        <div className="tablet:flex grid grid-cols items-center justify-between w-full text-white my-8">
          <div className="flex items-center">
            <div className="tablet:px-4 tablet:py-2 px-2 py-1 text-center tablet:text-base text-sm bg-yellow-500 rounded-md hover:bg-yellow-700 cursor-pointer">
              main link
            </div>
            <div className="tablet:px-4 tablet:py-2 px-2 py-1 text-center bg-yellow-500 rounded-md ml-4 tablet:text-base text-sm hover:bg-yellow-700 cursor-pointer">
              backup link
            </div>

            <div
              onClick={() => setTurnOff(true)}
              className="tablet:w-10 tablet:h-10 mobile-L:w-8 mobile-L:h-8 w-7 h-7 rounded-full border-white border flex items-center justify-center tablet:ml-4 ml-6 cursor-pointer transition-all duration-200 ease-in hover:shadow-lightRounder"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3/4 h-3/4  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
          </div>

          <div
            onClick={() => toggleLike()}
            className={
              isLike
                ? "flex items-center tablet:py-2 tablet:px-4 py-2 px-4 tablet:mt-0 mt-4 rounded-md bg-pink-800 tablet:text-base text-sm cursor-pointer transition-all duration-150 ease-linear hover:shadow-lightRounder hover:bg-pink-800"
                : "flex items-center tablet:py-2 tablet:px-4 py-2 px-4 tablet:mt-0 mt-4 tablet:w-auto w-1/2 rounded-md bg-pink-500 tablet:text-base text-sm cursor-pointer transition-all duration-150 ease-linear hover:shadow-lightRounder hover:bg-pink-800"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-hand-thumbs-up"
              viewBox="0 0 16 16"
            >
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
            <p className="mx-2">Like</p>
            <p>{numberLike}</p>
          </div>

        </div>

        <div className="flex items-center mb-4 desktop:max-h-96 tablet:max-h-96 max-h-64 justify-center desktop-L:text-3xl desktop:text-2xl tablet:text-xl mobile-L:text-lg mobile-S:text-base text-xl text-yellow-700  w-full my-4 desktop-L:p-12 desktop-L:py-8 desktop:py-8 tablet:p-12 mobile-M:px-6 mobile-S:px-4 mobile-L:py-8 mobile-S:py-4 bg-[#282828] flex-col">
          <p className="">Nếu phim bị lỗi hãy bấm xem server khác ...</p>
          <div className="w-full  overflow-y-auto  grid desktop:grid-cols-4 tablet:grid-cols-3 mobile-L:grid-cols-2 mobile-S:grid-cols-1 gap-8 desktop:text-base tablet:text-sm mobile:text-sm text-sm mt-8">
            {listEpisode.map((item, index) => {
              if (item.episodeId === episode)
                return (
                  <div
                    key={index}
                    className="py-2 px-4 rounded-md text-white bg-gray-700 flex items-center justify-center cursor-pointer"
                  >
                    Episode {item.episodeNum}
                  </div>
                );
              else
                return (
                  <div
                    key={index}
                    className="py-2 px-4 rounded-md text-white bg-gray-500 hover:bg-gray-700 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      navigate(`/${animeTitle}/${item.episodeId}`);
                    }}
                  >
                    Episode {item.episodeNum}
                  </div>
                );
            })}
          </div>
        </div>

        <Comment anime_title={animeTitle} anime_episode={episode} />
      </div>
    );
  else return <IsLoad />;
};

export default MovieWatch;
