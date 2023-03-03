import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { handleLogin } from "../firebase/handleLogin";

const Login = ({ type, setOpenLogin }) => {
  const value = JSON.parse(localStorage.getItem("remember_acc"));
  const [openBox, setOpenBox] = useState(false);
  const [remember, setRemember] = useState(value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const slideBox = useRef(null);

  const clearError = () => {
    setErrorEmail("");
    setErrorPassword("");
  };

  useEffect(() => {
    if (remember) {
      var token_ = JSON.parse(localStorage.getItem("acc"));
      var email_ = token_.slice(0, token_.indexOf("/"));
      var password_ = token_.slice(token_.indexOf("/") + 1);
      //alert(email_+"  "+password_)
      setEmail(email_);
      setPassword(password_);
    }
  }, []);

  useEffect(() => {
    if (type === "header") {
      if (openBox) {
        slideBox.current.classList.add("-translate-x-full");
      } else {
        slideBox.current.classList.remove("-translate-x-full");
      }
    } else {
      if (openBox) {
        slideBox.current.classList.add("translate-x-full");
      } else {
        slideBox.current.classList.remove("translate-x-full");
      }
    }
  }, [openBox]);

  const Login = async (email, password) => {
    clearError();
    await handleLogin(email, password)
      .then((res) => {
        if (res.key !== "error") {
          if (remember) {
            localStorage.setItem("remember_acc", JSON.stringify(true));
            localStorage.setItem("acc", JSON.stringify(email + "/" + password));
          } else {
            localStorage.setItem("remember_acc", JSON.stringify(false));
            localStorage.setItem("acc", JSON.stringify(null));
          }
          localStorage.setItem("user_id", JSON.stringify(res.data?.user?.uid));
          window.location.reload();
        } else {
          switch (res.data) {
            case "auth/email-already-in-use":
              setErrorEmail("Email already in use");
              break;
            case "auth/invalid-email":
              setErrorEmail("Invalid email");
              break;
            case "auth/wrong-password":
              setErrorPassword("Wrong password");
              break;
            case "auth/user-not-found":
              setErrorEmail("User not found");
              break;
            default:
              setErrorEmail(res.data);
          }
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        onClick={() => setOpenBox((openBox) => !openBox)}
        className="bi bi-person-circle w-7 h-7 cursor-pointer hover:scale-125 hover:shadow-2xl hover:text-red-500 mr-2 transition-all duration-300 ease-in-out"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
      <div className={type === "header" ? "hidden" : "flex mt-2 text-gray-500"}>
        <p className="">Login Now</p>
      </div>
      {openBox ? (
        <div
          className={
            type === "header"
              ? "w-screen h-screen absolute left-0 top-0 bg-[rgba(0,0,0,0.4)]"
              : "hidden"
          }
          onClick={() => setOpenBox((openBox) => !openBox)}
        />
      ) : (
        ""
      )}
      <div
        ref={slideBox}
        className={
          type === "header"
            ? " absolute h-screen desktop-L:w-[35rem] desktop:w-[25rem] tablet:w-[22rem] bg-themeLogin bg-center bg-cover top-0 left-full transition-all duration-300 ease-in-out "
            : "absolute h-screen w-screen bg-themeLogin bg-center bg-cover top-0 right-full transition-all duration-300 ease-in-out "
        }
      >
        <div
          onClick={() => setOpenBox((openBox) => !openBox)}
          className="absolute right-8 top-6 w-8 h-8 rounded-full border-gray-500 border-2 shadow-lightRounder bg-black text-white flex justify-center items-center duration-300 transition-all ease-in hover:scale-125 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <div className="px-8 mobile-L:py-16 mobile-S:py-10 text-white">
          <form action="" method="post">
            <p className="font-semibold text-xl">Sign In</p>
            <p className="mt-2">
              Enter your email address and password to access the account
            </p>

            <div className="flex desktop-L:mt-10 mt-4 items-center">
              <p className="mr-2">Email address</p>
              {errorEmail.length !== 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-exclamation-circle-fill text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              ) : (
                ""
              )}
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => clearError()}
              type="text"
              placeholder="Enter your email"
              value={email}
              className="mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none focus:shadow-lightRounder placeholder:font-semibold"
            />
            <p className="h-2  text-red-500 font-semibold">{errorEmail}</p>

            <div className="flex justify-between desktop-L:mt-10 mt-4">
              <div className="flex items-center">
                <p className="mr-2">Password</p>
                {errorPassword.length !== 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-exclamation-circle-fill text-red-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <p className=" border-b border-dashed font-semibold cursor-pointer hover:text-red-500 hover:border-red-500">
                Forgot Password?
              </p>
            </div>
            <input
              onFocus={() => clearError()}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Enter your password"
              className="mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none focus:shadow-lightRounder"
            />
            <p className="h-2  text-red-500 font-semibold">{errorPassword}</p>

            <div className="flex items-center desktop-L:mt-10 mt-4 cursor-pointer">
              <div className=" relative flex items-center">
                <input
                  className="w-6 h-6 cursor-pointer rounded mr-2 checked:bg-black appearance-none border-2 border-black indeterminate:bg-white focus:outline-none focus:border-0 focus:shadow-lightRounder"
                  type="checkbox"
                  checked={remember}
                  onClick={() => setRemember((remember) => !remember)}
                  readOnly
                />
                {remember ? (
                  <svg
                    onClick={() => setRemember((remember) => !remember)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-check-lg absolute top-0 left-0 cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <p onClick={() => setRemember((remember) => !remember)}>
                Remember me
              </p>
            </div>

            <button
              onClick={() => Login(email, password)}
              className="flex justify-center items-center w-full py-2 desktop-L:mt-12 mt-8 rounded bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.8)] hover:shadow-lightRounder transition-all duration-200 ease-in hover:-translate-y-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              <p className="ml-2">Log In</p>
            </button>
          </form>

          <div className="flex justify-center desktop-L:mt-10 mt-6">
            <p>Don't have an account? </p>
            <p
              onClick={() => setOpenLogin(false)}
              className="ml-2 font-semibold hover:text-red-500 cursor-pointer border-b border-white border-dashed hover:border-red-500"
            >
              Signup
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  type: PropTypes.string.isRequired,
  setOpenLogin: PropTypes.func.isRequired,
};

export default Login;
