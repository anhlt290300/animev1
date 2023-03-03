import React, { useState } from "react";
import PropTypes from "prop-types";
import { HandleLogOut } from "../firebase/handleLogOut";
const User = ({ type }) => {
  const [open, setOpen] = useState(false);
  const LogOut = async () => {
    await HandleLogOut()
      .then((res) => {
        if (res.key !== "error") {
          localStorage.setItem("user_id", JSON.stringify(null));
          window.location.reload()
        } else alert(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className=" relative">
      <img
        onClick={() => setOpen((open) => !open)}
        alt=''
        src="https://i.redd.it/yb44vmeyk6t91.jpg"
        className="w-12 border relative border-black rounded-full bg-auto cursor-pointer "
      />
      {open ? (
        <div className="w-[15rem] bg-gray-500 rounded-md shadow-lightRounder absolute top-full right-0 p-x overflow-hidden">
          <div
            onClick={() => LogOut()}
            className="flex items-center justify-center font-semibold py-2 text-xl cursor-pointer transition-all duration-150 ease-linear hover:text-red-500 hover:bg-black"
          >
            <span>Log Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right ml-4"
              viewBox="0 0 16 16"
            >
              <path
                fill="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

User.propTypes = {
  type: PropTypes.string.isRequired,
};

export default User;
