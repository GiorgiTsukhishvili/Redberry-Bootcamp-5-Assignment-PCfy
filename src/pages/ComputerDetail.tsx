import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import ArrowDesktop from "../assets/images/Arrow-back-desktop.svg";
import ArrowMobile from "../assets/images/Arrow-back-mobile.svg";
import { fetchSignle } from "../utilities/fetchLeptops";
import { LaptopData, Team, Position } from "../utilities/interfaces";
import ComputerDetailMiddle from "../components/ComputerDetails/ComputerDetailMiddle";
import { fetchDefault } from "../utilities/fetchdefaults";
import ComputerDetailBottom from "../components/ComputerDetails/ComputerDetailBottom";

import "../styles/Lists/ComputerDetail.scss";
import ComputerDetailsTop from "../components/ComputerDetails/ComputerDetailsTop";

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

  return (
    <div className="computer-detail">
      <Link to="/list-of-computers">
        <img
          src={ArrowDesktop}
          alt="Arrow"
          className="computer-detail__arrow--desktop"
        />
        <img
          src={ArrowMobile}
          alt="Arrow"
          className="computer-detail__arrow--mobile"
        />
      </Link>
      <h1 className="computer-detail__header">ლეპტოპის ინფო</h1>

      {single ? (
        <div className="computer-detail__container">
          <ComputerDetailsTop
            singleName={single.user.name}
            teamName={teamName?.name}
            positionName={positionName?.name}
            singleEmail={single.user.email}
            singlePhone={single.user.phone_number}
            singleImg={single.laptop.image}
          />
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
