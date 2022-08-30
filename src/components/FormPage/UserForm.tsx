import React, { useEffect, useState } from "react";

import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";

import "../../styles/form/UserForm.scss";

interface UserForm {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
}

const UserForm = () => {
  const [inputs, setInputs] = useState<UserForm>({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fromLocal = localStorage.getItem("user");
    if (fromLocal) {
      setInputs(JSON.parse(fromLocal));
    }
  }, []);

  useEffect(() => {
    let time: any;

    // I decided to set this simple timeout of 1 second to not update local storage every
    // time and save some memory

    time = setTimeout(
      () => localStorage.setItem("user", JSON.stringify(inputs)),
      1000
    );

    return () => clearTimeout(time);
  }, [inputs]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const saveInputs = (e: string, input: string) => {
    setInputs({ ...inputs, [e]: input });
  };

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
              {...register("name", {
                required: true,
                minLength: 2,
                pattern: /^[ა-ჰ]+$/,
              })}
              style={
                errors.name ? { borderColor: "#E52F2F", outline: "none" } : {}
              }
              value={inputs.name}
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
              value={inputs.surname}
              onChange={(e) => saveInputs(e.target.name, e.target.value)}
            />
            {errors.surname ? (
              <p style={{ color: "#E52F2F" }}>გამოიყენე ქართული ასოები</p>
            ) : (
              <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}
          </div>
        </div>

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
            value={inputs.email}
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
            value={inputs.phone_number}
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

{
  /* <Select
        placeholder="Type to match nothing 😱"
        multi
        onChange={() => undefined}
        values={[]}
        options={[]}
      /> */
}
