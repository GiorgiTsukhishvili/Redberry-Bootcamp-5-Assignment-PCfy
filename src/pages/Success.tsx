import React from "react";

import { Link } from "react-router-dom";

import SuccessImg from "../assets/images/Success.svg";

import "../styles/success/Success.scss";

const Success = () => {
  return (
    <div className="success">
      <div className="success__container">
        <img src={SuccessImg} alt="Success" />
        <h1 className="success__container__header">ჩანაწერი დამატებულია!</h1>
        <Link to="/list-of-computers" className="success__container__link-one">
          სიაში გადაყვანა
        </Link>
        <Link to="/" className="success__container__link-two">
          მთავარი
        </Link>
      </div>
    </div>
  );
};

export default Success;
