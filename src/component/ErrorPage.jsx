import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pageError from "../asset/image/pageError.gif";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ previousPage }) => {
  const [previous, setPrevious] = useState(-1);
  
  useEffect(()=>{
    if (previousPage != undefined) {
      setPrevious(previousPage)
    }
  },[])

  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[30rem] w-full relative">
      <img className="h-2/5 mobile:h-2/3 " src={pageError} alt="" />
      <button
        className="text-3xl mobile:text-4xl px-4 pb-2 text-white absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[7rem] hover:shadow-lightRounder transition-all duration-300 ease-in-out hover:scale-90"
        onClick={() => navigate(previous)}
      >
        Go Back
      </button>
    </div>
  );
};
ErrorPage.propTypes = {
  previousPage: PropTypes.number,
};

export default ErrorPage;
