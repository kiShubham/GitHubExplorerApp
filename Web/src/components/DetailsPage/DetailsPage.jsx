/* eslint-disable no-unused-vars */
// import React from "react";
import style from "./DetailsPage.module.css";
import file from "../../assets/file.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <Link to={"/"} state={data.owner.login}>
        <button>⏮go back</button>
      </Link>

      <div className={style.detailsPage}>
        <div className={style.imageSection}>
          <img src={file} alt="icon" className={style.avatar} />
          <p>{data.name}</p>
          <p>{data.language}</p>
        </div>
        <div className={style.repoDetails}>
          <div className={style.btn}>
            <Link to={data.html_url}>
              <button>visit github</button>
            </Link>
            {data.homepage ? (
              <Link to={data.homepage}>
                <button>Deployment</button>
              </Link>
            ) : null}
          </div>
          <div className={style.repoDetailTxt}>
            <p>Owner : {data.owner.login}</p>
            <p>Last updated : {data.updated_at}</p>
            <p className={style.description}>
              {data.description || "Description not given "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
// description not given by user
