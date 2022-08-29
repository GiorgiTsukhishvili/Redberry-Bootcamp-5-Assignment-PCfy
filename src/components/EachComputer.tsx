import React from "react";

import { Link } from "react-router-dom";

import { Laptops } from "../utilities/interfaces";

import "../styles/Lists/EachLaptop.scss";

const EachComputer = ({ data }: { data: Laptops }) => {
  const { laptop, user } = data;

  // I created three post requests to fast and because of that
  // 3 links give error in response as imgs do not exist, I am unable to
  // remove images from backend and this errors will stay for now.

  const imgUrl = "https://pcfy.redberryinternship.ge" + laptop.image;

  return (
    <div className="each-computer">
      <img src={imgUrl} alt="Computer" className="each-computer__image" />
      <div>
        <h1 className="each-computer__person">
          {user.name} {user.surname}
        </h1>

        <h1 className="each-computer__brand">{laptop.name}</h1>

        <Link to="/" className="each-computer__more">
          მეტის ნახვა
        </Link>
      </div>
    </div>
  );
};

export default EachComputer;
