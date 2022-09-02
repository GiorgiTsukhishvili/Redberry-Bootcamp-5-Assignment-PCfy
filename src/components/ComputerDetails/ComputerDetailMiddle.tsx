import React, { Fragment, useEffect, useState } from "react";

import { OnlyLaptop } from "../../utilities/interfaces";
import { fetchDefault } from "../../utilities/fetchdefaults";
import { Brand } from "../../utilities/interfaces";

import "../../styles/Lists/ComputerDetailMiddle.scss";

const ComputerDetailMiddle = ({ laptop }: { laptop: OnlyLaptop }) => {
  const [brand, setBrand] = useState<Brand[]>();

  useEffect(() => {
    const brandDetail = async () => {
      const data = await fetchDefault("brands");
      setBrand(data.data);
    };

    brandDetail();
  }, []);

  const brandName = brand
    ? brand.find((item) => item.id === laptop.brand_id)
    : "";

  return (
    <Fragment>
      <div className="computer-detail__container__middle__left">
        <div className="computer-detail__container__middle__left-left">
          <h1>ლეპტოპის სახელი:</h1>
          <h1>ლეპტოპის ბრენდი:</h1>
          <h1>RAM:</h1>
          <h1>მეხსიერების ტიპი:</h1>
        </div>
        <div className="computer-detail__container__middle__left-right">
          <h1>{laptop.name}</h1>
          <h1>{brandName !== "" && brandName ? brandName.name : ""}</h1>
          <h1>{laptop.ram}</h1>
          <h1>{laptop.hard_drive_type}</h1>
        </div>
      </div>
      <div className="computer-detail__container__middle__right">
        <div className="computer-detail__container__middle__left-left">
          <h1>CPU:</h1>
          <h1>CPU-ს ბირთვი:</h1>
          <h1>CPU-ს ნაკადი:</h1>
        </div>
        <div className="computer-detail__container__middle__left-right">
          <h1>{laptop.cpu.name}</h1>
          <h1>{laptop.cpu.cores}</h1>
          <h1>{laptop.cpu.threads}</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default ComputerDetailMiddle;
