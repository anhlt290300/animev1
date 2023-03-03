import React, { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import { useSelector } from "react-redux";
const UserBox = ({ type }) => {
  const [openLogin, setOpenLogin] = useState(true);
  const userId = useSelector((state) => state.user.uid);
  //console.log(userId);
  return (
    <div
      className={
        type === "header"
          ? "hidden tablet:flex items-center justify-center desktop-L:ml-0 desktop:ml-4 tablet:ml-2"
          : "w-full flex justify-center items-center mt-12 flex-col"
      }
    >
      {userId != null ? <User type={type} /> : ""}
      {openLogin && userId == null ? (
        <Login type={type} setOpenLogin={setOpenLogin} />
      ) : (
        ""
      )}
      {!openLogin && userId == null ? (
        <Register type={type} setOpenLogin={setOpenLogin} />
      ) : (
        ""
      )}
    </div>
  );
};

UserBox.propTypes = {
  type: PropTypes.string.isRequired,
};

export default UserBox;
