import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { handleRegister } from "../firebase/handleResgister";
import { Usercontext } from "../context/UserContext";
const Register = ({ setOpenLogin, type }) => {
  const [openBox, setOpenBox] = useState(true);
  const [accept, setAccept] = useState(false);
  const slideBox = useRef(null);
  //console.log(user);
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

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorFullname, setErrorFullname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const clearError = () => {
    setErrorFullname("");
    setErrorEmail("");
    setErrorPassword("");
  };

  const Register = async (fullname, email, password) => {
    clearError();
    if (fullname.length === 0) {
      setErrorFullname("Cannot be left blank");
    } else if (fullname.length < 6) {
      setErrorFullname("Weak");
    } else {
      await handleRegister(fullname, email, password)
        .then((res) => {
          if (res.key !== "error") {
            localStorage.setItem(
              "user_id",
              JSON.stringify(res.data?.user?.uid)
            );
            window.location.reload();
          } else {
            switch (res.data) {
              case "auth/email-already-in-use":
                setErrorEmail("Email already in use");
                break;
              case "auth/invalid-email":
                setErrorEmail("Invalid email");
                break;
              case "auth/weak-password":
                setErrorPassword("Weak password");
                break;
              default:
                setErrorEmail(res.data);
            }
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        onClick={() => {
          setOpenBox((openBox) => !openBox);
          clearError();
          //setOpenLogin(true)
        }}
        className="bi bi-person-circle w-7 h-7 cursor-pointer hover:scale-125 hover:shadow-2xl hover:text-red-500 mr-2 transition-all duration-300 ease-in-out"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
      {openBox ? (
        <div
          className={
            type === "header"
              ? "w-screen h-screen absolute left-0 top-0 bg-[rgba(0,0,0,0.4)]"
              : "hidden"
          }
          onClick={() => {
            setOpenBox((openBox) => !openBox);
          }}
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
            <p className="font-semibold text-xl">Free Sign Up</p>
            <p className="mt-2">
              Don't have an account? Create one, it only takes a minute
            </p>

            <div className="flex desktop-L:mt-10 mt-4 items-center">
              <p className="mr-2">Full Name</p>
              {errorFullname.length !== 0 ? (
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
              onChange={(e) => setFullname(e.target.value)}
              onFocus={() => clearError()}
              type="text"
              placeholder="Enter your name"
              className={
                errorFullname.length === 0
                  ? "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none focus:shadow-lightRounder placeholder:font-semibold"
                  : "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none shadow-ErrorRounder placeholder:font-semibold"
              }
            />
            <p className="h-2 text-red-500 font-semibold">{errorFullname}</p>

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
              onFocus={() => clearError()}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className={
                errorEmail.length === 0
                  ? "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none focus:shadow-lightRounder placeholder:font-semibold"
                  : "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none shadow-ErrorRounder placeholder:font-semibold"
              }            />
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
            </div>
            <input
              onFocus={() => clearError()}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className={
                errorPassword.length === 0
                  ? "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none focus:shadow-lightRounder placeholder:font-semibold"
                  : "mt-2 w-full py-2 px-4 bg-[rgba(0,0,0,0.3)] rounded outline-none shadow-ErrorRounder placeholder:font-semibold"
              }            />
            <p className="h-2  text-red-500 font-semibold">{errorPassword}</p>

            <div className="flex items-center desktop-L:mt-10 mt-4 cursor-pointer">
              <div
                onClick={() => setAccept((accept) => !accept)}
                className={
                  accept
                    ? "flex items-center justify-center rounded bg-black w-6 h-6 mr-2 border border-black"
                    : "flex items-center justify-center rounded bg-[rgba(0,0,0,0.3)] w-6 h-6 mr-2 border border-black"
                }
              >
                {accept ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <p onClick={() => setAccept((accept) => !accept)}>
                I accept{" "}
                <span className="border-b-2 border-dashed">
                  Terms And Conditions
                </span>
              </p>
            </div>

            <button
              onClick={() => Register(fullname, email, password)}
              className="flex justify-center items-center w-full py-2 desktop-L:mt-12 mt-8 rounded bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.8)] hover:shadow-lightRounder transition-all duration-200 ease-in hover:-translate-y-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-plus"
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                <path
                  fill="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              <p className="ml-2">Sign Up</p>
            </button>
          </form>

          <div className="flex justify-center desktop-L:mt-10 mt-6">
            <p>Already have account? </p>
            <p
              onClick={() => setOpenLogin(true)}
              className="ml-2 font-semibold hover:text-red-500 cursor-pointer border-b border-white border-dashed hover:border-red-500"
            >
              Log In
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Register.propTypes = {
  setOpenLogin: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Register;
