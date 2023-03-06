import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "./Card";
import IsLoad from "./IsLoad";
import { useNavigate } from "react-router-dom";
const ListCards = ({ genre, data_, popular, movies, topairing }) => {
  const [data, setData] = useState(data_ === undefined ? null : data_);
  const navigate = useNavigate();
  useEffect(() => {
    if (data_ !== undefined) setData(data_);
  }, [data_]);
  useEffect(() => {
    if (genre !== undefined) {
      axios
        .get(`https://gogoanime.consumet.stream/genre/${genre}`)
        .then((res) => {
          //console.log(res.data)
          let change = () => setTimeout(() => setData(res.data), 300);
          change();
          return clearTimeout(change);
        })
        .catch((error) => {
          navigate("/error-page/server-error");
        });
    }
  }, [genre, navigate]);

  useEffect(() => {
    if (popular !== undefined) {
      //console.log('aaa')
      axios
        .get(`https://gogoanime.consumet.stream/popular`)
        .then((res) => {
          //console.log(res.data);
          let change = () => setTimeout(() => setData(res.data), 300);
          change();
          return clearTimeout(change);
        })
        .catch((error) => {
          navigate("/error-page/server-error");
        });
    }
  }, [popular, navigate]);

  useEffect(() => {
    if (movies !== undefined) {
      axios
        .get(`https://gogoanime.consumet.stream/anime-movies`)
        .then((res) => {
          //console.log(res.data);
          let change = () => setTimeout(() => setData(res.data), 300);
          change();
          return clearTimeout(change);
        })
        .catch((error) => {
          navigate("/error-page/server-error");
        });
    }
  }, [movies, navigate]);

  useEffect(() => {
    if (topairing !== undefined) {
      //console.log('aaa')
      axios
        .get(`https://gogoanime.consumet.stream/top-airing`)
        .then((res) => {
          //  console.log(res.data);
          let change = () => setTimeout(() => setData(res.data), 300);
          change();
          return clearTimeout(change);
        })
        .catch((error) => {
          navigate("/error-page/server-error");
        });
    }
  }, [topairing, navigate]);

  if (data === null) return <IsLoad />;
  else
    return (
      <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 mobile-L:grid-cols-2 grid-cols-1 tablet:gap-8 mobile-L:gap-4 gap-8 py-4 relative z-[2]">
        {data !== null &&
          data.map((item, index) => {
            return (
              <div className="" key={index}>
                <Card
                  animeId={item.animeId}
                  animeTitle={item.animeTitle}
                  animeImg={item.animeImg}
                />
              </div>
            );
          })}
      </div>
    );
};

ListCards.propTypes = {
  genre: PropTypes.string,
  data_: PropTypes.array,
  popular: PropTypes.bool,
  movies: PropTypes.bool,
  topairing: PropTypes.bool,
};

export default ListCards;
