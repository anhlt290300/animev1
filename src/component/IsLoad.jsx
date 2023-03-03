import React, { useState } from "react";
import gifIsloading from "../asset/image/isload2.gif";
const IsLoad = () => {
  const [solong, setSolong] = useState(false);

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSolong(true);
    }, 3000);

    return () => window.clearTimeout(timeoutID);
  }, []);
  return (
    <div className="h-[15rem] mobile-L:h-[20rem] tablet:h-[30rem] w-full flex justify-center items-center">
      <img src={gifIsloading} className="tablet:w-1/3 mobile:w-1/2 w-1/2" />
      <h1 className="text-white desktop:ml-16 tablet:text-3xl mobile-S:text-sm mobile-L:ml-12 mobile-M:ml-8 ml-2">
        <p>Is Loading ...</p>
        {solong ? (
          <p className=" text-red-500 font-semibold tablet:mt-4 mt-2">
            The server is free, so it's often blocked to get data erratically
          </p>
        ) : (
          ""
        )}
      </h1>
    </div>
  );
};

export default IsLoad;
