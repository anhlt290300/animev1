import React from "react";
import ListCards from "../component/ListCards";

const TopAiring = () => {
  return (
    <div className="text-white">
      <h1 className=" inline-block border-b-2 border-red-500 desktop-L:text-3xl tablet:text-2xl mobile-L:text-base text-sm font-semibold">
        TOP AIRING
      </h1>
      <ListCards topairing={true} />
      <img
        src="https://i551.ntcdntempv26.com/data/images/4389/966409/003-11a5c58.jpg?data=net"
        alt=""
      />
    </div>
  );
};

export default TopAiring;
