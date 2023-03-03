import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../asset/image/logo.png";
import BurgerMenu from "./BurgerMenu";
import SearchBox from "./SearchBox";
import UserBox from "./UserBox";
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="text-base fixed z-[999] top-0 left-0 right-0 desktop-L:h-[6rem] desktop:h-[5rem] h-[5rem] w-full px-[3rem] bg-white border-b-[1px] border-borderbox flex items-center justify-between">
      <div
        className="h-full flex items-center cursor-pointer"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/");
        }}
      >
        <img
          src={logo}
          alt=""
          className="h-full desktop:w-[12rem] tablet:w-[6rem] w-[8rem] desktop-L:h-[6rem] desktop:h-[4rem] tablet:h-[3rem] mobile-L:h-[4rem] mobile-S:h-[3rem] "
        />
      </div>

      <div className="hidden tablet:flex tablet:items-center tablet:justify-around font-semibold desktop-L:text-2xl desktop:text-base tablet:text-xs ">
        <div
          className="desktop:mx-4 tablet:mx-2 mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 
        after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          Home
        </div>
        <div
          className="mx-[1rem] cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0
        after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          Popular Anime
        </div>
        <div
          className="mx-[1rem] cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0
        after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          Anime Movies
        </div>
        <div
          className="mx-[1rem] cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0
        after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          Top Airing
        </div>
      </div>

      <SearchBox type="header" />
      <UserBox type="header"/>
      <BurgerMenu />
    </div>
  );
};

export default Header;
