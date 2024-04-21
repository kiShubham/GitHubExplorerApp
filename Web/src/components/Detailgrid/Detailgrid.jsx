/* eslint-disable react/prop-types */
// import React from "react";

import style from "./Detailgrid.module.css";
import fileImg from "../../assets/file.svg";
import tick from "../../assets/tick.svg";
import { Link } from "react-router-dom";

const Detailgrid = ({ data }) => {
  return (
    <Link to={"/detailsPage"} state={data}>
      <div className={style.detailGrid}>
        <img src={fileImg} alt="avatar" className={style.avatar} />
        <div className={style.repoDetail}>
          <div className={style.repoName}>
            <p>{data.name}</p>
            <img src={tick} alt="icon" />
          </div>
          <p className={style.description}>
            {data.description || "Description not given "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Detailgrid;
