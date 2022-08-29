import React, { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

import { fetchAll } from "../utilities/fetchLeptops";
import { Laptops } from "../utilities/interfaces";
import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import EachLaptop from "../components/EachComputer";

import "../styles/Lists/ListPage.scss";

// I posted 3 times from PCfy API jsut to have some dummy data to create design,
// as I at first created all laptops page and afterwards created forms.

const ListPage = () => {
  const [laptops, setLaptops] = useState<Laptops[]>();

  useEffect(() => {
    const getResponse = async () => {
      const data = await fetchAll();
      setLaptops(data.data);
    };
    getResponse();
  }, []);

  return (
    <div className="list-page">
      <Link to="/">
        <img
          src={ArrowDesktop}
          alt="Arrow"
          className="list-page__arrow--desktop"
        />
      </Link>
      <h1 className="list-page__header">ჩანაწერების სია</h1>
      <div className="list-page__laptops">
        {laptops
          ? laptops.map((item) => <EachLaptop key={uuid()} data={item} />)
          : ""}
      </div>
    </div>
  );
};

export default ListPage;
