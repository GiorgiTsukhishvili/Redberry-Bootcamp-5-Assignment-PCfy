import React, { useState } from "react";

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

const FormPage = () => {
  const [page, setPage] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<WholeInfo>({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    team_id: null,
    position_id: null,
    token: "2d20b5112d1d7d3d395f0a3671c78b62",
    laptop_name: "",
    laptop_image: "",
    laptop_brand_id: null,
    laptop_cpu: "",
    laptop_cpu_cores: null,
    laptop_cpu_threads: null,
    laptop_ram: null,
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: null,
  });

  const updateUserInfoOne = (info: UserFormToSend) => {
    setUserInfo((prevState: WholeInfo) => {
      return { ...prevState, ...info };
    });
  };

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
        <UserForm
          updateInfo={updateUserInfoOne}
          setPage={setPage}
          page={page}
        />
      ) : (
        <LaptopForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setPage={setPage}
          page={page}
          sendData={sendData}
        />
      )}

      <img src={LogoLarge} alt="Logo" className="form__logo" />
    </div>
  );
};

export default FormPage;
