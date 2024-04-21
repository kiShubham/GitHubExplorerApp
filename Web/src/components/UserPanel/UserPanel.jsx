/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
import style from "./UserPanel.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserPanel = ({ userData }) => {
  return (
    <div className={style.userPanel}>
      <div className={style.avatarParent}>
        <img src={userData.avatar_URL} alt="Avatar" />
      </div>
      <div className={style.userInfo}>
        <div className={style.userDetail}>
          <p>
            {userData.username}, {userData.location || "earth"}
          </p>
          <p className={style.bio}>{userData.bio}</p>
          <p>public_repos: {userData.public_repos}</p>
          <p>followers : {userData.followers}</p>
          <p>friends: {userData.friends}</p>
        </div>
        {userData.followers ? (
          <Link to={"/follower"} state={userData}>
            <button>Followers</button>
          </Link>
        ) : (
          <button disabled>No Followers</button>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
