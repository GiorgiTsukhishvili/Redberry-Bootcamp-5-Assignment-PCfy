import React, { Fragment } from "react";

import { OnlyLaptop } from "../utilities/interfaces";

import "../styles/Lists/ComputerDetailBottom.scss";

const ComputerDetailBottom = ({ laptop }: { laptop: OnlyLaptop }) => {
  return (
    <Fragment>
      <div className="computer-detail__container__bottom__left">
        <div className="computer-detail__container__bottom__left-left">
          <h1>ლეპტოპის მდგომარეობა:</h1>
          <h1>ლეპტოპის ფასი:</h1>
        </div>
        <div className="computer-detail__container__bottom__left-right">
          <h1>{laptop.state}</h1>
          <h1>{laptop.price} ₾</h1>
        </div>
      </div>

      {laptop.purchase_date !== null || laptop.purchase_date === "" ? (
        <div className="computer-detail__container__bottom__right">
          <div className="computer-detail__container__bottom__right-left">
            <h1>შევსების რიცხვი:</h1>
          </div>
          <div className="computer-detail__container__bottom__right-right">
            <h1>{laptop.purchase_date.replaceAll("-", " / ")}</h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ComputerDetailBottom;
