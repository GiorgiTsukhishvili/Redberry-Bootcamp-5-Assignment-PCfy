import React from "react";

import { Link } from "react-router-dom";

import { Laptops } from "../utilities/interfaces";

import "../styles/Lists/EachLaptop.scss";

const EachComputer = ({ data }: { data: Laptops }) => {
  const { laptop, user } = data;

  // I created four post requests from online API to just to get data in
  // order to create design

  const imgUrl = "https://pcfy.redberryinternship.ge" + laptop.image;

  return (
    <div className="each-computer">
      <img src={imgUrl} alt="Computer" className="each-computer__image" />
      <div>
        <h1 className="each-computer__person">
          {user.name} {user.surname}
        </h1>

        <h1 className="each-computer__brand">{laptop.name}</h1>

        <Link
          to={`/computer-details/${laptop.id}`}
          className="each-computer__more"
        >
          მეტის ნახვა
        </Link>
      </div>
    </div>
  );
};

export default EachComputer;
