/* eslint-disable no-unused-vars */
// import React from "react";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import githubLogo from "../../assets/cat.svg";
import UserPanel from "../UserPanel/UserPanel";
import Navbar from "../Navbar/Navbar";
import RepoList from "../RepoList/RepoList";
import { fetchuser, fetchRepoArray } from "../../api/api";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  const newUsername = location.state;

  const [userData, setUserData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [input, setInput] = useState("");

  const fetchUserData = async (username) => {
    const res = await fetchuser(username);
    // console.log(res);

    if (res.response) {
      if (res.response.status === 404) {
        window.alert("no such username exist");
        return null;
      } else if (res.response.staus === 409) {
        window.alert("user already exist in Db");
      } else if (res.response.status === 403) {
        window.alert("daily limit exceed of the api reponse");
        return null;
      }
    }

    // console.log(res.newUserData.repoUrl);
    const repoArray = await fetchRepoArray(res.newUserData.repoUrl);
    return { data: res.newUserData, repoArray };
  };

  // useEffect will only update the data when we are going back from the repodetail page or followerspage;
  useEffect(() => {
    async function fetchnew(username) {
      const res = await fetchUserData(username);
      if (res) {
        setUserData(res.data);
        setRepoData(res.repoArray);
      }
    }
    if (newUsername) fetchnew(newUsername); // true given just to fetch from db ;
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input) {
      const res = await fetchUserData(input);
      if (res) {
        setUserData(res.data);
        setRepoData(res.repoArray);
      }
      setInput(""); // Clear the input field after fetching user data
    }
  };
  const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
    // return true if Empty
  };

  return (
    <div className={style.Home}>
      <Navbar />
      <div className={style.middleSection}>
        <div className={style.userLogin}>
          <img src={githubLogo} alt="" className={style.logo} />
          <form onSubmit={handleSubmit} className={style.form}>
            <input
              type="username"
              name="username"
              id="username"
              required
              placeholder="enter github username"
              onChange={handleChange}
            />
            <button type="submit">submit</button>
          </form>
        </div>
        {isEmpty(userData) ? null : <UserPanel userData={userData} />}
      </div>
      <div>{repoData.length ? <RepoList repoArray={repoData} /> : null}</div>
    </div>
  );
};
