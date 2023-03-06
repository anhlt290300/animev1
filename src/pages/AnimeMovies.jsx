import React from "react";
import ListCards from "../component/ListCards";

const AnimeMovies = () => {
  return (
    <div className="text-white">
      <h1 className=" inline-block border-b-2 border-red-500 desktop-L:text-3xl tablet:text-2xl mobile-L:text-base text-sm font-semibold">ANIME MOVIES</h1>
      <ListCards movies={true} />
    </div>
  );
};

export default AnimeMovies;
