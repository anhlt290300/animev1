import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pageError from "../asset/image/pageError.gif";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ previousPage, data = "2222" }) => {
  const [previous, setPrevious] = useState(-1);

  useEffect(() => {
    if (previousPage != undefined) {
      setPrevious(previousPage);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col items-center h-screen w-full relative -translate-y-16">
      <img className=" tablet:h-3/5 mobile-M:h-1/3 h-1/4 " src={pageError} alt="" />
      {data !== undefined ? (
        <p className=" mb-16 font-semibold desktop:text-3xl tablet:text-xl mobile-L:text-base mobile-S:text-xs text-red-500">
          The server is free, so it's often blocked to get data erratically
        </p>
      ) : (
        ""
      )}
      <button
        className="text-3xl mobile:text-4xl px-4 pb-2 text-white hover:shadow-lightRounder transition-all duration-300 ease-in-out hover:scale-90"
        onClick={() => navigate(previous)}
      >
        Go Back
      </button>
    </div>
  );
};
ErrorPage.propTypes = {
  previousPage: PropTypes.number,
  data: PropTypes.string,
};

export default ErrorPage;
