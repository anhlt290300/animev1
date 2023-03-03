import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "./Card";
import IsLoad from "./IsLoad";
import { useNavigate } from "react-router-dom";
const ListCards = ({ genre = "action", data_ = undefined }) => {
  const [data, setData] = useState(data_ === undefined ? null : data_);
  const navigate = useNavigate();
  useEffect(() => {
    if (data_ !== undefined) setData(data_);
  }, [data_]);
  useEffect(() => {
    if (data_ === undefined) {
      axios
        .get(`https://gogoanime.consumet.stream/genre/${genre}`)
        .then((res) => {
          //console.log(res.data)
          setTimeout(() => setData(res.data), 300);
          //console.log(res.data)
        })
        .catch((error) => {
          navigate("/error-page/server-error");
        });
    }
  }, [genre]);

  if (data === null) return <IsLoad />;
  else
    return (
      <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 mobile-L:grid-cols-2 grid-cols-1 gap-8 py-8 relative z-[2]">
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
};

export default ListCards;
