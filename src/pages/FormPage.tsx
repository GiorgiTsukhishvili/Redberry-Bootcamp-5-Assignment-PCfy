import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import FormPageTop from "../components/FormPage/FormPageTop";
import UserForm from "../components/FormPage/UserForm";
import LaptopForm from "../components/FormPage/LaptopForm";
import { UserFormToSend, WholeInfo } from "../utilities/interfaces";

import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import ArrowMobile from "../assets/images/Arrow-back-mobile.svg";
import LogoLarge from "../assets/images/Logo-large.svg";

import "../styles/form/FormPage.scss";
import axios from "axios";
import { FormContext } from "../context/FormContext";

const FormPage = () => {
  const [page, setPage] = useState<boolean>(true);
  const { userInfo, setUserInfo } = useContext(FormContext);

  const sendData = async () => {
    await axios
      .post(`https://pcfy.redberryinternship.ge/api/laptop/create`, userInfo, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        window.location.href = "/success";
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form">
      <Link to="/">
        <img src={ArrowDesktop} alt="Arrow" className="form__arrow--desktop" />
        <img src={ArrowMobile} alt="Arrow" className="form__arrow--mobile" />
      </Link>

      <FormPageTop page={page} />

      {page ? (
        <UserForm setPage={setPage} page={page} />
      ) : (
        <LaptopForm setPage={setPage} page={page} sendData={sendData} />
      )}

      <img src={LogoLarge} alt="Logo" className="form__logo" />
    </div>
  );
};

export default FormPage;
