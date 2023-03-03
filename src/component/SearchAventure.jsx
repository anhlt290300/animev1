import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BoxList from "./BoxList";
import ListCards from "./ListCards";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GenreListData } from "./GenreList ";
const SearchAventure = (props) => {
  const key_search = useParams().key;
  const [dataSearch, setDataSearch] = useState(null);
  const [genre, setGenre] = useState(null);
  const [status, setStatus] = useState(null);
  const [softBy, setSoftBy] = useState(null);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    axios
      .get(`https://gogoanime.consumet.stream/search?keyw=${key_search}`)
      .then((res) => {
        if (res.data.length !== 0) setDataSearch(res.data);
        else setDataSearch(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key_search]);
  return (
    <div className="pt-16 text-white">
      <div className=" bg-gray-500 px-4 py-4 grid tablet:grid-cols-4 mobile-L:grid-cols-2 grid-cols-1 mobile-L:gap-4 gap-2">
        <div className="h-full w-full flex items-end justify-center">
          <BoxList
            title="Genre"
            index="Genres"
            list={GenreListData}
            width="w-32"
            getValue={setGenre}
          />
        </div>
        <div className="h-full w-full flex items-end justify-center">
          <BoxList
            title="Status"
            index="Completed"
            list={["Completed", "Upcoming", "Ongoing"]}
            width="w-32"
            getValue={setStatus}
          />
        </div>

        <div className="h-full w-full flex items-end justify-center">
          <BoxList
            title="sorted by"
            index="View"
            list={["View", "Comment", "Year"]}
            width="w-32"
            getValue={setSoftBy}
          />
        </div>

        <div className="h-full w-full flex items-end justify-center">
          <button
            onClick={() => {
              var g = genre ? ` genres: ${genre}` : "";
              var s = status ? `, status: ${status}` : "";
              var sb = softBy ? `, softed by: ${softBy}` : "";
              setDetail(g + s + sb);
            }}
            className=" bg-red-500 px-12 py-2 flex justify-center mobile-L:mt-0 mt-4 w-32 text-center rounded transition-all duration-150 ease-in-out hover:-translate-y-2 hover:shadow-lightRounder hover:bg-red-800"
          >
            <p>Search</p>
          </button>
        </div>
      </div>

      <p className="mt-6 text-2xl">List anime search for: {key_search}</p>
      {detail ? <p className="mt-6 text-2xl">{detail}</p> : ""}

      {dataSearch !== null ? (
        <ListCards data_={dataSearch} />
      ) : (
        <p className="mt-6 text-2xl inline-block p-2 text-black font-semibold bg-red-500">
          No result{" "}
        </p>
      )}
    </div>
  );
};

SearchAventure.propTypes = {
  param: PropTypes.string.isRequired,
};

export default SearchAventure;
