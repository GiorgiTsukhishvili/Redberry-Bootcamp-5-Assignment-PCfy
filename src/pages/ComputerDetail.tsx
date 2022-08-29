import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import { fetchSignle } from "../utilities/fetchLeptops";
import { LaptopData, Team, Position } from "../utilities/interfaces";
import ComputerDetailMiddle from "../components/ComputerDetailMiddle";
import { fetchDefault } from "../utilities/fetchdefaults";
import ComputerDetailBottom from "../components/ComputerDetailBottom";

import "../styles/Lists/ComputerDetail.scss";

const ComputerDetail = () => {
  const [single, setSingle] = useState<LaptopData>();
  const [position, setPosition] = useState<Position[]>();
  const [team, setTeam] = useState<Team[]>();

  const { id } = useParams();
  const teamName = team?.find((item) => item.id === single?.user.team_id);
  const positionName = position?.find(
    (item) => item.id === single?.user.position_id
  );

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const data = await fetchSignle(id.toString());

        setSingle(data.data);
      };

      getData();
    }
  }, [id]);

  useEffect(() => {
    const teamDetail = async () => {
      const data = await fetchDefault("teams");
      setTeam(data.data);
    };

    const positionDetail = async () => {
      const data = await fetchDefault("positions");
      setPosition(data.data);
    };

    teamDetail();
    positionDetail();
  }, []);

  console.log(single);

  const imgUrl = "https://pcfy.redberryinternship.ge" + single?.laptop.image;

  return (
    <div className="computer-detail">
      <Link to="/list-of-computers">
        <img
          src={ArrowDesktop}
          alt="Arrow"
          className="computer-detail__arrow--desktop"
        />
      </Link>
      <h1 className="computer-detail__header">ლეპტოპის ინფო</h1>

      {single ? (
        <div className="computer-detail__container">
          <div className="computer-detail__container__top">
            <img
              src={imgUrl}
              alt="Laptop"
              className="computer-detail__container__top__image"
            />
            <div className="computer-detail__container__top__middle-section">
              <h1>სახელი:</h1>
              <h1>თიმი:</h1>
              <h1>პოზიცია:</h1>
              <h1>მეილი:</h1>
              <h1>ტელ. ნომერი:</h1>
            </div>
            <div className="computer-detail__container__top__middle-right">
              <h1>{single.user.name}</h1>
              <h1>{teamName?.name}</h1>
              <h1>{positionName?.name}</h1>
              <h1>{single.user.email}</h1>
              <h1>{single.user.phone_number}</h1>
            </div>
          </div>
          <div className="computer-detail__container__middle">
            {single ? <ComputerDetailMiddle laptop={single.laptop} /> : ""}
          </div>
          <div className="computer-detail__container__bottom">
            {single ? <ComputerDetailBottom laptop={single.laptop} /> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ComputerDetail;
