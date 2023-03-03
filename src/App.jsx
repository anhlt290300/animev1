import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Movie from "./component/Movie";
import MovieWatch from "./component/MovieWatch";
import ErrorPage from "./component/ErrorPage";
import ScrollStartBtn from "./component/ScrollStartBtn";
import SearchAventure from "./component/SearchAventure";
import { useEffect } from "react";
const LayOut = () => {
  var pathname = useLocation().pathname;

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className=" h-screen bg-black overflow-x-visible relative">
      <Header />
      <div className="pt-[5rem] px-[3rem] bg-black ">
        <Outlet />
      </div>
      <ScrollStartBtn />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path=":animeTitle/full" element={<Movie />} />
          <Route path=":animeTitle/:episode" element={<MovieWatch />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="error-page" element={<ErrorPage previousPage={-2} />} />
          <Route
            path="search-adventure/:key"
            element={<SearchAventure param="abc" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
