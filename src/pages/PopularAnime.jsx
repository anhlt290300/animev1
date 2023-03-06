import React from "react";
import ListCards from "../component/ListCards";
const PopularAnime = () => {
  return (
    <div className="text-white">
      <h1 className=" inline-block border-b-2 border-red-500 desktop-L:text-3xl tablet:text-2xl mobile-L:text-base text-sm font-semibold">POPULAR ANIME</h1>
      <ListCards popular={true} />
    </div>
  );
};

export default PopularAnime;
