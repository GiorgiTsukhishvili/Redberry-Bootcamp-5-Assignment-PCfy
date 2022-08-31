import React from "react";

import { ComputerDetailsTopProps } from "../../utilities/interfaces";

import "../../styles/Lists/ComputerDetailsTop.scss";

const ComputerDetailsTop = ({
  singleName,
  teamName,
  positionName,
  singleEmail,
  singlePhone,
  singleImg,
}: ComputerDetailsTopProps) => {
  const imgUrl = "https://pcfy.redberryinternship.ge" + singleImg;

  return (
    <div className="computer-detail__container__top">
      <img
        src={imgUrl}
        alt="Laptop"
        className="computer-detail__container__top__image"
      />
      <div className="computer-detail__container__top__content">
        <div className="computer-detail__container__top__content__middle-section">
          <h1>სახელი:</h1>
          <h1>თიმი:</h1>
          <h1>პოზიცია:</h1>
          <h1>მეილი:</h1>
          <h1>ტელ. ნომერი:</h1>
        </div>
        <div className="computer-detail__container__top__content__middle-right">
          <h1>{singleName}</h1>
          <h1>{teamName}</h1>
          <h1>{positionName}</h1>
          <h1>{singleEmail}</h1>
          <h1>{singlePhone}</h1>
        </div>
      </div>
    </div>
  );
};

export default ComputerDetailsTop;
