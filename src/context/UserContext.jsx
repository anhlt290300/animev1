import React, { createContext, useState } from "react";
export const Usercontext = createContext(null);
const UserContext = ({ children }) => {
  const [uid, setUid] = useState(JSON.parse(localStorage.getItem("user_id")));
  const resetUid = ()=>{
    setUid(JSON.parse(localStorage.getItem("user_id")))
  }
  const value = {
    user: uid,
  };
  return (
    <>
      <Usercontext.Provider value={value}>{children}</Usercontext.Provider>
    </>
  );
};

export default UserContext;
