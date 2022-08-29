import React from "react";

import { Link } from "react-router-dom";

import Logo from "../assets/images/Logo.svg";
import MainImage from "../assets/images/Main-picture.svg";
import MainImagePhone from "../assets/images/Main-picture-2.svg";

import "../styles/Main/Main.scss";

const Main = () => {
  return (
    <div className="main">
      <img src={Logo} alt="Logo" className="main__logo" />
      <img src={MainImage} alt="Landing Photo" className="main__image" />
      <img
        src={MainImagePhone}
        alt="Landing Photo"
        className="main__image-phone"
      />

      <Link to="/forms-page" className="main__button">
        ჩანაწერის დამატება
      </Link>
      <Link to="/list-of-computers" className="main__button">
        ჩანაწერების სია
      </Link>
    </div>
  );
};

export default Main;
