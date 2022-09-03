import React, { useEffect, useState, useContext } from "react";

import { useForm } from "react-hook-form";

import { fetchDefault } from "../../utilities/fetchdefaults";
import {
  Team,
  TeamModified,
  Position,
  UseForm,
  UserFormToSend,
} from "../../utilities/interfaces";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "../../styles/form/UserForm.scss";
import setDropdownValidHook from "../../hooks/setDropdownValidHook";
import { FormContext } from "../../context/FormContext";

const UserForm = ({
  updateInfo,
  setPage,
  page,
}: {
  updateInfo: (info: UserFormToSend) => void;
  setPage: (value: boolean) => void;
  page: boolean;
}) => {
  const { userInfo, setUserInfo } = useContext(FormContext);

  const { dropdownValid, changeDropdown } = setDropdownValidHook();
  const [firstDropdown, setFirstDropdown] = useState<TeamModified[]>([]);
  const [secondDropdown, setSecondDropdown] = useState<TeamModified[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>();

  const onSubmit = handleSubmit((data) => {
    if (userInfo.team_id === null && userInfo.position_id === null) {
      changeDropdown("first", false);
      changeDropdown("second", false);
      return;
    } else if (userInfo.team_id === null) {
      changeDropdown("first", false);
      return;
    } else if (userInfo.position_id === null) {
      changeDropdown("second", false);
      return;
    }

    setPage(!page);
  });

  useEffect(() => {
    const dataToUse: TeamModified[] = [];

    const fetch = async () => {
      const data = await fetchDefault("teams");

      data.data.forEach((item: Team) =>
        dataToUse.push({ value: item.id.toString(), label: item.name })
      );

      setFirstDropdown(dataToUse);
    };

    fetch();
  }, []);

  useEffect(() => {
    const dataToUse: TeamModified[] = [];

    const fetch = async () => {
      const data = await fetchDefault("positions");

      const chosenTeam = data.data.filter(
        (item: Position) => item.team_id === userInfo.team_id
      );

      chosenTeam.forEach((item: Team) =>
        dataToUse.push({ value: item.id.toString(), label: item.name })
      );

      setSecondDropdown(dataToUse);
    };

    fetch();
  }, [userInfo.team_id]);

  const saveInputs = (e: string, input: string) => {
    setUserInfo({ ...userInfo, [e]: input });
  };

  const changeFirst = (value: string) => {
    setUserInfo({ ...userInfo, team_id: +value, position_id: null });
    changeDropdown("first", true);
  };

  const changeSecond = (value: string) => {
    setUserInfo({ ...userInfo, position_id: +value });
    changeDropdown("second", true);
  };

  const defaultOptionOne =
    userInfo.team_id !== null
      ? firstDropdown.find(
          (item) => item.value === userInfo.team_id?.toString()
        )?.value
      : "";

  const defaultOptionTwo =
    userInfo.position_id !== null
      ? secondDropdown.find(
          (item) => item.value === userInfo.position_id?.toString()
        )?.value
      : "";

  return (
    <div className="user-form">
      <form onSubmit={onSubmit} className="user-form__form">
        <div className="user-form__form__user">
          <div className="user-form__form__user-left">
            <label
              htmlFor="user-form__form__user-left__name"
              className="user-form__form__user-left__name-label"
              style={errors.name ? { color: "#E52F2F" } : {}}
            >
              სახელი
            </label>
            <input
              type="text"
              id="user-form__form__user-left__name"
              placeholder="გრიშა"
              value={userInfo.name}
              {...register("name", {
                required: true,
                minLength: 2,
                validate: {
                  hasSpecialChar: (v) => /^[ა-ჰ]+$/.test(v),
                },
              })}
              style={
                errors.name ? { borderColor: "#E52F2F", outline: "none" } : {}
              }
              onChange={(e) => saveInputs(e.target.name, e.target.value)}
            />
            {errors.name ? (
              <p style={{ color: "#E52F2F" }}>გამოიყენე ქართული ასოები</p>
            ) : (
              <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}
          </div>
          <div className="user-form__form__user-right">
            <label
              htmlFor="user-form__form__user-right__lastName"
              className="user-form__form__user-right__lastName-label"
              style={errors.surname ? { color: "#E52F2F" } : {}}
            >
              გვარი
            </label>
            <input
              type="text"
              id="user-form__form__user-right__lastName"
              placeholder="ბაგრატიონი"
              {...register("surname", {
                required: true,
                minLength: 2,
                pattern: /^[ა-ჰ]+$/,
              })}
              style={
                errors.surname
                  ? { borderColor: "#E52F2F", outline: "none" }
                  : {}
              }
              value={userInfo.surname}
              onChange={(e) => saveInputs(e.target.name, e.target.value)}
            />
            {errors.surname ? (
              <p style={{ color: "#E52F2F" }}>გამოიყენე ქართული ასოები</p>
            ) : (
              <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}
          </div>
        </div>
        <Dropdown
          options={firstDropdown}
          value={defaultOptionOne}
          placeholder="თიმი"
          controlClassName={
            dropdownValid.first
              ? "user-form__dropdown"
              : "user-form__dropdown--wrong"
          }
          arrowClassName="user-form__arrow"
          menuClassName="user-form__menu"
          onChange={(e) => changeFirst(e.value)}
        />

        <Dropdown
          options={secondDropdown}
          value={defaultOptionTwo}
          placeholder="პოზიცია"
          controlClassName={
            dropdownValid.second
              ? "user-form__dropdown"
              : "user-form__dropdown--wrong"
          }
          arrowClassName="user-form__arrow"
          menuClassName="user-form__menu"
          onChange={(e) => changeSecond(e.value)}
        />

        <div className="user-form__form__mail">
          <label
            htmlFor="user-form__form__mail__input"
            className="user-form__form__mail__input-label"
            style={errors.email ? { color: "#E52F2F" } : {}}
          >
            მეილი
          </label>
          <input
            type="text"
            id="user-form__form__mail__input"
            placeholder="grishy@redberry.ge"
            {...register("email", {
              required: true,
              minLength: 13,
              validate: {
                endsWith: (v) =>
                  v.slice(v.length - 12, v.length) === "@redberry.ge",
              },
            })}
            style={
              errors.email ? { borderColor: "#E52F2F", outline: "none" } : {}
            }
            value={userInfo.email}
            onChange={(e) => saveInputs(e.target.name, e.target.value)}
          />
          {errors.email ? (
            <p style={{ color: "#E52F2F" }}>დაამთავრეთ @redberry.ge-ით</p>
          ) : (
            <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
          )}
        </div>
        <div className="user-form__form__phone">
          <label
            htmlFor="user-form__form__phone__input"
            className="user-form__form__phone__input-label"
            style={errors.phone_number ? { color: "#E52F2F" } : {}}
          >
            ტელეფონის ნომერი
          </label>
          <input
            type="text"
            id="user-form__form__phone__input"
            placeholder="+995 598 00 07 01"
            {...register("phone_number", {
              required: true,
              validate: {
                startsWith: (v) => v.slice(0, 4) === "+995",
                areNumbers: (v) =>
                  v
                    .slice(1, v.length)
                    .split("")
                    .every((item) => typeof +item === "number"),
                length: (v) => v.length === 13,
              },
            })}
            value={userInfo.phone_number}
            onChange={(e) => saveInputs(e.target.name, e.target.value)}
            style={
              errors.phone_number
                ? { borderColor: "#E52F2F", outline: "none" }
                : {}
            }
          />
          {errors.phone_number ? (
            <p style={{ color: "#E52F2F" }}>
              უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
            </p>
          ) : (
            <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>
          )}
        </div>
        <button className="user-form__button">შემდეგი</button>
      </form>
    </div>
  );
};

export default UserForm;
