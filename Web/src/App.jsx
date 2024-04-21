/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Detailgrid from "./components/Detailgrid/Detailgrid";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import FollowersPage from "./components/FollowersPage/FollowersPage";
import { Home } from "./components/Home/Home";
// import FigmaEmbed from "./components/Navbar/FigmaEbed";
import Navbar from "./components/Navbar/Navbar";
import RepoList from "./components/RepoList/RepoList";
import UserPanel from "./components/UserPanel/UserPanel";

// FigmaEmbed
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/follower" element={<FollowersPage />} />
        <Route path="/detailsPage" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
