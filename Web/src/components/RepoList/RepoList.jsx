/* eslint-disable react/prop-types */
// import React from "react";
import style from "./RepoList.module.css";
import Detailgrid from "../Detailgrid/Detailgrid";

const RepoList = ({ repoArray }) => {
  return (
    <div className={style.repoList}>
      {repoArray.map((repo, index) => (
        <Detailgrid key={index} data={repo} />
      ))}
    </div>
  );
};

export default RepoList;
