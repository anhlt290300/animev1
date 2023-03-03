import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBox = ({ type }) => {
  const navigate = useNavigate();

  const path = useLocation().pathname;

  const [openX, setopenX] = useState(false);

  const searchRef = useRef(null);

  const inputRef = useRef(null);

  const [value, setValue] = useState("");

  const [dataSearch, setDataSearch] = useState(null);

  useEffect(() => {
    setValue("");
  }, [path]);

  useEffect(() => {
    if (value !== "") {
      setopenX(true);
      axios
        .get(`https://gogoanime.consumet.stream/search?keyw=${value}`)
        .then((res) => {
          if (res.data.length !== 0) setDataSearch(res.data);
          else setDataSearch(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setopenX(false);
      setDataSearch(null);
    }
  }, [value]);

  const changeValue = (value) => {
    setValue(value);
  };

  const cleanInput = () => {
    setValue("");
  };

  return (
    <div
      ref={searchRef}
      className={
        type === "header"
          ? "relative hidden mobile:w-full desktop-L:w-[20rem] desktop:w-[12rem] tablet:w-[8rem] mx-8 tablet:mx-0 px-4 py-2 border border-gray-600 tablet:flex justify-between rounded-full"
          : "relative mx-4 px-4 py-2 border border-gray-600 rounded-full flex items-center justify-between"
      }
    >
      <svg
        className="w-7 h-7   hover:scale-110 hover:text-lg hover:shadow-2xl hover:text-red-500 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        ref={inputRef}
        value={value}
        className="w-full outline-none"
        type="text"
        onChange={(e) => changeValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && value.length > 0) {
            navigate(`/search-adventure/${value}`);
          }
        }}
      />
      {openX ? (
        <svg
          onClick={() => cleanInput()}
          className="w-7 h-7 cursor-pointer hover:scale-110 hover:text-lg hover:shadow-2xl ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        ""
      )}

      {value !== "" ? (
        <div className="w-full absolute top-12 left-0 z-50  bg-gray-300 rounded">
          {dataSearch !== null ? (
            <div
              className={
                type === "header"
                  ? "max-h-96 overflow-auto relative"
                  : "max-h-72 overflow-auto relative"
              }
            >
              {dataSearch.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/${item.animeId}/full`);
                      setValue("");
                      window.location.reload();
                    }}
                    className="flex items-center justify-between p-2 pb-4 border-b border-black max-h-[6rem] cursor-pointer"
                    key={index}
                  >
                    <img className="max-h-20" src={item.animeImg} alt="" />
                    <div className="flex flex-col w-full p-2 justify-between">
                      <p className="capitalize text-lg font-semibold h-[2rem] overflow-hidden">
                        {item.animeId}
                      </p>
                      <p>{item.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div
            className=" absolute z-200 -bottom-10 w-full flex items-center justify-center py-2 bg-red-600 text-white font-semibold text-xl hover:bg-red-800 cursor-pointer"
            onClick={() => {
              navigate(`/search-adventure/${value}`);
            }}
          >
            Enter to Search ...
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

SearchBox.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBox;
