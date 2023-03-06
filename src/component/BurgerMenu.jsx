import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import UserBox from "./UserBox";

const BurgerMenu = () => {
  var pathname = useLocation().pathname;

  useEffect(() => setOpen(false), [pathname]);

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const markRef = useRef(null);

  const path = useLocation().pathname;

  const [elementFocus, setElementFocus] = useState(path);

  useEffect(() => {
    setElementFocus(path);
  }, [path]);

  useEffect(() => {
    if (open) {
      menuRef.current.classList.add("translate-x-full");
    } else {
      menuRef.current.classList.remove("translate-x-full");
    }
  }, [open]);

  return (
    <div className="tablet:hidden block">
      <svg
        className="w-8 h-8 transition-all duration-200 ease-in-out hover:scale-125"
        onClick={() => setOpen(!open)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <div
        ref={markRef}
        onClick={() => setOpen((open) => !open)}
        className={
          open
            ? " absolute z-10 left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex"
            : "hidden"
        }
      />
      <div
        ref={menuRef}
        className=" absolute top-0 right-full z-20 h-screen mobile-L:w-[20rem] mobile-M:w-[18rem] w-[15rem] bg-white text-base font-semibold transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col items-center">
          <Link
            to={"/"}
            className={
              elementFocus === "/"
                ? "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-full hover:after:w-full after:transition-all after:ease-in after:duration-250 "
                : "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250 "
            }
            onClick={() => setOpen(!open)}
          >
            Home
          </Link>
          <Link
            to={"popular-anime"}
            className={
              elementFocus === "/popular-anime"
                ? "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-full hover:after:w-full after:transition-all after:ease-in after:duration-250 "
                : "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250 "
            }
            onClick={() => setOpen(!open)}
          >
            Popular Anime
          </Link>
          <Link
            to={"anime-movies"}
            className={
              elementFocus === "/anime-movies"
                ? "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-full hover:after:w-full after:transition-all after:ease-in after:duration-250 "
                : "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250 "
            }
            onClick={() => setOpen(!open)}
          >
            Anime Movies
          </Link>
          <Link
            to={"top-airing"}
            className={
              elementFocus === "/top-airing"
                ? "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-full hover:after:w-full after:transition-all after:ease-in after:duration-250 "
                : "mobile-L:m-4 m-2 py-1 relative after:absolute after:left-0 after:bottom-0 cursor-pointer after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250 "
            }
            onClick={() => setOpen(!open)}
          >
            Top Airing
          </Link>
        </div>

        <div className="mobile:hidden block">
          <SearchBox type="burgermenu" />
          <UserBox type="burgermenu" />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
