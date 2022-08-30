import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import FormPageTop from "../components/FormPage/FormPageTop";

import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import ArrowMobile from "../assets/images/Arrow-back-mobile.svg";
import LogoLarge from "../assets/images/Logo-large.svg";

import "../styles/form/FormPage.scss";

const FormPage = () => {
  const [page, setPage] = useState<boolean>(true);

  return (
    <div className="form">
      <Link to="/">
        <img src={ArrowDesktop} alt="Arrow" className="form__arrow--desktop" />
        <img src={ArrowMobile} alt="Arrow" className="form__arrow--mobile" />
      </Link>

      <FormPageTop page={page} />

      <img src={LogoLarge} alt="Logo" className="form__logo" />
    </div>
  );
};

export default FormPage;
