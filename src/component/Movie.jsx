import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoneEpisode from "./NoneEpisode";
import IsLoad from "./IsLoad";
import {
  handleToggleFavoriteAnime,
  isFavoriteAnime,
} from "../firebase/handleFavoriteAnime";
import Comment from "./Comment";

const Movie = () => {
  const navigate = useNavigate();

  const { animeTitle } = useParams();

  const [data, setData] = useState([]);

  const [episodesList, setEpisodesist] = useState(null);

  const [genres, setGenres] = useState(null);

  const [isNull, setIsNull] = useState(true);

  const [open, setOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    (async () => {
      await isFavoriteAnime(
        animeTitle,
        JSON.parse(localStorage.getItem("user_id"))
      )
        .then((res) => {
          if (res) setIsFavorite(res);
        })
        .catch((e) => {
          alert(e);
        });
    })();
    return () => {};
  }, []);

  const ClickWatchAnime = () => {
    if (isNull) {
      setOpen(true);
    } else {
      navigate(`/${animeTitle}/${episodesList[0].episodeId}`);
    }
  };

  const toggleToFavorite = async () => {
    if (JSON.parse(localStorage.getItem("user_id")) === null) {
      alert("Dang nhap da");
    } else {
      console.log('aaa')
      await handleToggleFavoriteAnime(
        animeTitle,
        JSON.parse(localStorage.getItem("user_id")),
        isFavorite
      )
        .then((res) => {
          if (res.key !== "error") {
            if (res.data === "add") {
              alert("Them vao list anime yeu thich");
            } else {
              alert("xoa khoi list anime yeu thich");
            }
            setIsFavorite((isFavorite) => !isFavorite);
          } else {
            alert(res.data);
          }
        })
        .catch((e) => {});
    }
  };

  useEffect(() => {
    axios
      .get(`https://gogoanime.consumet.stream/anime-details/${animeTitle}`)
      .then((res) => {
        //console.log(res.data)
        setTimeout(() => {
          setData(res.data);
          setEpisodesist(res.data.episodesList.reverse());
          setGenres(res.data.genres);
          if (res.data.episodesList.length !== 0) setIsNull(false);
        }, 300);
      })
      .catch((error) => {
        //console.log('loi r');
        navigate("/error-page/server-error");
      });
  }, []);

  if (data.length === 0) {
    return <IsLoad />;
  } else
    return (
      <div className="  tablet:w-4/5 w-full mt-8 mx-auto">
        <NoneEpisode show={open} setShow={setOpen} />
        <div className="w-full flex items-center justify-center ">
          <div className=" w-full mobile:p-8 desktop:px-12 desktop:py-8 mobile-M:px-6 px-4 mobile-L:py-8 py-4 tablet:px-12 tablet:py-12 bg-gray-500">
            <div className="flex flex-col items-center w-full">
              <div className="desktop:flex w-full desktop:h-[30rem] justify-center overflow-y-hidden grid grid-cols-1 items-center">
                <div className="relative w-full h-full desktop:pr-4 flex items-center justify-end">
                  <div className="relative w-full h-full overflow-hidden mobile-S:rounded-none rounded-md">
                    <img
                      className="h-full w-full transition-all duration-200 ease-in hover:scale-110"
                      src={data.animeImg}
                      alt=""
                    />
                    <div className="absolute bottom-0 left-0 w-full mobile-L:h-16 h-20 bg-[rgba(0,0,0,0.7)] flex mobile-L:flex-row flex-col items-center justify-center desktop-L:text-xl desktop:text-lg tablet:text-base mobile-S:text-sm text-base">
                      <div className=" mobile-L:py-2 py-1 px-4 bg-sky-500 text-white mobile-L:inline-block mobile-L:mb-0 mb-2 text-center rounded-md mx-2 hover:bg-sky-700 cursor-pointer">
                        Trailer
                      </div>
                      <div
                        className="mobile-L:py-2 py-1 px-4 bg-red-500 text-white mobile-L:inline-block block text-center rounded-md mx-2  hover:bg-red-700 cursor-pointer"
                        onClick={() => ClickWatchAnime()}
                      >
                        Watch Anime
                      </div>
                    </div>
                    <div
                      onClick={() => toggleToFavorite()}
                      className={
                        isFavorite
                          ? "absolute top-4 right-2 rounded-full cursor-pointer  bg-[rgb(218,44,171,0.8)] text-white p-4 transition-all duration-150 ease-linear hover:bg-[rgb(218,44,171,0.8)] hover:translate-y-1 hover:shadow-lightRounder flex items-center justify-center"
                          : "absolute top-4 right-2 rounded-full cursor-pointer bg-[rgb(218,44,171,0.3)] text-white p-4 transition-all duration-150 ease-linear hover:bg-[rgb(218,44,171,0.8)] hover:translate-y-1 hover:shadow-lightRounder flex items-center justify-center"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative w-full h-full mobile:pl-4 flex items-center justify-start mobile:mt-0 mt-4">
                  <div className="relative w-full tablet:h-full flex flex-col items-start justify-between ">
                    <div className="w-full mb-2 -mt-2 mobile:h-[30rem] h-full overflow-y-auto mobile:block flex flex-col justify-between">
                      <p className="uppercase tablet:text-3xl mobile-L:text-2xl text-xl font-semibold text-yellow-500 ">
                        {data.animeTitle}
                      </p>
                      <p className=" mobile-L:text-sm text-xs">
                        {data.otherNames}
                      </p>
                    </div>

                    <div className="w-full bg-[rgba(0,0,0,0.9)] p-4 text-white my-2 tablet:text-base text-sm">
                      <p>
                        Genres:<span> </span>
                        {genres !== null
                          ? genres.map((item, index) => {
                              return (
                                <span className="text-cyan-400" key={index}>
                                  {item},<span> </span>
                                </span>
                              );
                            })
                          : ""}
                      </p>
                      <p>
                        Anime Type:
                        <span className="text-cyan-400"> {data.type}</span>
                      </p>
                      <p>
                        Status:
                        <span className="text-cyan-400"> {data.status}</span>
                      </p>
                      <p>
                        Total Episodes:
                        <span className="text-cyan-400">
                          {" "}
                          {data.totalEpisodes}
                        </span>
                      </p>
                      <p>
                        Year:
                        <span className="text-cyan-400">
                          {" "}
                          {data.releasedDate}
                        </span>
                      </p>
                    </div>

                    <div className="w-full desktop:h-full h-[10rem]  bg-[rgba(0,0,0,0.9)] p-4 text-white mt-2 overflow-y-auto">
                      {episodesList !== null && episodesList.length !== 0 ? (
                        <div className="grid tablet:grid-cols-3 mobile:grid-cols-2 grid-cols-3 gap-4">
                          {episodesList.map((item, index) => {
                            return (
                              <div
                                className="py-2 px-4 rounded-lg text-xs bg-gray-700 flex items-center justify-center cursor-pointer hover:text-cyan-400 hover:bg-gray-800"
                                onClick={() =>
                                  navigate(`/${animeTitle}/${item.episodeId}`)
                                }
                                key={index}
                              >
                                <span className="mr-2">Episodes</span>
                                {index + 1}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-cyan-400">Coming Soon....</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col bg-[rgba(0,0,0,0.9)] mt-8 justify-center items-start p-4 text-white bg-">
                <p className="text-center font-semibold uppercase text-yellow-500 tablet:text-xl mobile-L:text-lg text-base">
                  Synopsis
                </p>
                <p className="tablet:my-4 my-2 tablet:text-base text-sm">
                  {data.synopsis.length !== 0
                    ? data.synopsis
                    : "Coming Soon...."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Comment anime_title={animeTitle} />
      </div>
    );
};

export default Movie;
