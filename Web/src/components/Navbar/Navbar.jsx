// import React from "react";
import style from "./Navbar.module.css";
import catImg from "../../assets/cat.svg";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <img src={catImg} alt="githubLogo" />
        <p>Github_Explorer</p>
      </div>
    </div>
  );
};

export default Navbar;
