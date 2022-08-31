import React, { useState } from "react";

import { Link } from "react-router-dom";

import FormPageTop from "../components/FormPage/FormPageTop";
import UserForm from "../components/FormPage/UserForm";
import { UserFormToSend, WholeInfo } from "../utilities/interfaces";

import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import ArrowMobile from "../assets/images/Arrow-back-mobile.svg";
import LogoLarge from "../assets/images/Logo-large.svg";

import "../styles/form/FormPage.scss";

const FormPage = () => {
  const [page, setPage] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<WholeInfo>({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    team_id: null,
    position_id: null,
    token: "",
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
    setUserInfo({ ...userInfo, ...info });
  };

  console.log(userInfo);

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
        ""
      )}

      <img src={LogoLarge} alt="Logo" className="form__logo" />
    </div>
  );
};

export default FormPage;
