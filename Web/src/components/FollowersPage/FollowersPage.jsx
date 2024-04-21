/* eslint-disable react/prop-types */
// import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./FollowersPage.module.css";

// import follower from "../../assets/follower.json";

const FollowersPage = () => {
  const location = useLocation();
  const userData = location.state;
  const followersdata = userData.followersArray;

  return (
    <div className={style.followersPage}>
      <div className={style.text}>
        <p>Followers</p>
        <Link to={"/"} state={userData.username}>
          <button>go back ⏮⏮</button>
        </Link>
      </div>

      <div className={style.list}>
        {followersdata.map((e, index) => {
          return (
            <div className={style.follower} key={index}>
              <img src={e.avatar_url} alt="avatar" className={style.avatar} />
              <div className={style.Name}>
                <p>{e.login}</p>
                <Link to={"/"} state={e.login}>
                  <button>visit</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowersPage;
