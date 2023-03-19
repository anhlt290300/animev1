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
        src="https://cdn.hencb.top/ext/2021/2/3/yeu-cau-hu-hong-bi-mat/1/01.jpg"
        referrerPolicy="no-referrer"
        alt=""
      />
    </div>
  );
};

export default TopAiring;
