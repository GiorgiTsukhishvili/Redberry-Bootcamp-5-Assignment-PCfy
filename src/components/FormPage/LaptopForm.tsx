import React, { useState, useEffect, Fragment } from "react";

import { useForm } from "react-hook-form";
import { fetchDefault } from "../../utilities/fetchdefaults";
import Dropdown from "react-dropdown";
import setDropdownValidHook from "../../hooks/setDropdownValidHook";

import {
  LaptopFormProps,
  LaptopUseForm,
  BrandModified,
  Brand,
  CPUModified,
  CPU,
} from "../../utilities/interfaces";

import ExclLarge from "../../assets/images/excl-large.svg";
import ExclSmall from "../../assets/images/excl-small.svg";
import Camera from "../../assets/images/camera.svg";

import "../../styles/form/LaptopForm.scss";
import "react-dropdown/style.css";

const LaptopForm = ({ userInfo, setUserInfo }: LaptopFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LaptopUseForm>();
  const [firstDropdown, setFirstDropdown] = useState<BrandModified[]>([]);
  const [secondDropdown, setSecondDropdown] = useState<CPUModified[]>([]);
  const { dropdownValid, changeDropdown } = setDropdownValidHook();

  const onSubmit = handleSubmit((data) => {
    if (userInfo.laptop_brand_id === null && userInfo.laptop_cpu === null) {
      changeDropdown("first", false);
      changeDropdown("second", false);
      return;
    } else if (userInfo.laptop_brand_id === null) {
      changeDropdown("first", false);
      return;
    } else if (userInfo.laptop_cpu === null) {
      changeDropdown("second", false);
      return;
    }
    // console.log(data);
  });

  useEffect(() => {
    const dataToUse2: BrandModified[] = [];

    const fetch = async () => {
      const data = await fetchDefault("brands");

      data.data.forEach((item: Brand) =>
        dataToUse2.push({ value: item.id.toString(), label: item.name })
      );

      setFirstDropdown(dataToUse2);
    };

    fetch();

    const dataToUse: CPUModified[] = [];

    const fetch2 = async () => {
      const data = await fetchDefault("cpus");

      data.data.forEach((item: CPU) =>
        dataToUse.push({ value: item.id.toString(), label: item.name })
      );

      setSecondDropdown(dataToUse);
    };

    fetch2();
  }, []);

  const transformImage = async (files: FileList | null) => {
    if (files !== null) {
      const convertImage = async () => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();

          fileReader.readAsDataURL(files[0]);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const convertedImage = await convertImage();

      setUserInfo({ ...userInfo, laptop_image: convertedImage });
    }
  };

  const saveInputsString = (e: string, input: string) => {
    setUserInfo({ ...userInfo, [e]: input });
  };

  const saveInputsNumber = (e: string, input: number) => {
    setUserInfo({ ...userInfo, [e]: input });
  };

  console.log(userInfo);

  const changeDro = (value: string, name: string) => {
    setUserInfo({ ...userInfo, [name]: +value });
    changeDropdown("first", true);
  };

  const defaultOptionOne =
    userInfo.laptop_brand_id !== null
      ? firstDropdown.find(
          (item) => item.value === userInfo.laptop_brand_id?.toString()
        )?.value
      : "";

  const defaultOptionTwo =
    userInfo.laptop_cpu !== null
      ? firstDropdown.find(
          (item) => item.value === userInfo.laptop_cpu?.toString()
        )?.value
      : "";

  return (
    <div className="laptop-form">
      <form onSubmit={onSubmit} className="laptop-form__form">
        <div
          className={
            errors.laptop_image
              ? "laptop-form__form__img--error"
              : "laptop-form__form__img"
          }
        >
          <input
            type="file"
            accept="image/*"
            className="laptop-form__form__img__input"
            multiple
            {...register("laptop_image", {
              required: true,
            })}
            onChange={(e) => transformImage(e.target.files)}
          />

          <div className="laptop-form__form__img__desktop">
            <img
              src={ExclLarge}
              alt="Error"
              style={errors.laptop_image ? {} : { opacity: 0 }}
            />
            <p style={errors.laptop_image ? { color: "#E52F2F" } : {}}>
              ჩააგდე ან ატვირთე ლეპტოპის ფოტო
            </p>
            <button>ატვირთე</button>
          </div>

          <div className="laptop-form__form__img__mobile">
            <img
              src={Camera}
              alt="Camera"
              className="laptop-form__form__img__camera"
            />
            <p>ლეპტოპის ფოტოს ატვირთვა</p>
            {errors.laptop_image ? (
              <img
                src={ExclSmall}
                alt="Error"
                className="laptop-form__form__img__error--small"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="laptop-form__form__top">
          <div className="laptop-form__form__top-left">
            <label
              htmlFor="laptop-form__form__top-left__name"
              className="laptop-form__form__top-left__name-label"
              style={errors.laptop_name ? { color: "#E52F2F" } : {}}
            >
              ლეპტოპის სახელი
            </label>
            <input
              type="text"
              id="laptop-form__form__top-left__name"
              placeholder="HP"
              {...register("laptop_name", {
                required: true,
                minLength: 2,
                validate: {
                  hasSpecialChar: (v) =>
                    /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(v),
                },
              })}
              style={
                errors.laptop_name
                  ? { borderColor: "#E52F2F", outline: "none" }
                  : {}
              }
              value={userInfo.laptop_name}
              onChange={(e) => saveInputsString(e.target.name, e.target.value)}
            />
            {errors.laptop_name ? (
              <p style={{ color: "#E52F2F" }}>
                ლათინური ასოები, ციფრები, !@#$%^&*()_+=
              </p>
            ) : (
              <p>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</p>
            )}
          </div>
          <Dropdown
            options={firstDropdown}
            value={defaultOptionOne}
            placeholder="ლეპტოპის ბრენდი"
            controlClassName={
              dropdownValid.first
                ? "laptop-form__form__top-right__brand"
                : "laptop-form__form__top-right__brand--wrong"
            }
            arrowClassName="laptop-form__form__top-right__arrow"
            menuClassName="laptop-form__form__top-right__menu"
            onChange={(e) => changeDro(e.value, "laptop_brand_id")}
          />
        </div>

        <div className="laptop-form__form__middle">
          <div className="laptop-form__form__middle__top">
            <Dropdown
              options={secondDropdown}
              value={defaultOptionTwo}
              placeholder="CPU"
              controlClassName={
                dropdownValid.first
                  ? "laptop-form__form__middle__top__cpu"
                  : "laptop-form__form__middle__top__cpu--wrong"
              }
              arrowClassName="laptop-form__form__middle__top-right__arrow"
              menuClassName="laptop-form__form__middle__top-right__menu"
              onChange={(e) => changeDro(e.value, "laptop_cpu")}
            />

            <div className="laptop-form__form__middle__top__input">
              <div className="laptop-form__form__middle__top__input__each">
                <label
                  htmlFor="laptop-form__form__middle__top__input__each__name"
                  className="laptop-form__form__middle__top__input__each__name-label"
                  style={errors.laptop_name ? { color: "#E52F2F" } : {}}
                >
                  CPU-ს ბირთვი
                </label>
                <input
                  type="number"
                  id="laptop-form__form__middle__top__input__each__name"
                  placeholder="14"
                  {...register("laptop_cpu_cores", {
                    required: true,
                    validate: {
                      hasSpecialChar: (v) => /^[0-9]+$/.test(v!.toString()),
                    },
                  })}
                  style={
                    errors.laptop_cpu_cores
                      ? { borderColor: "#E52F2F", outline: "none" }
                      : {}
                  }
                  value={
                    userInfo.laptop_cpu_cores !== null
                      ? userInfo.laptop_cpu_cores
                      : ""
                  }
                  onChange={(e) =>
                    saveInputsNumber(e.target.name, +e.target.value)
                  }
                />
                {errors.laptop_cpu_cores ? (
                  <p style={{ color: "#E52F2F" }}>მხოლოდ ციფრები</p>
                ) : (
                  <p>მხოლოდ ციფრები</p>
                )}
              </div>
              <div className="laptop-form__form__middle__top__input__each">
                <label
                  htmlFor="laptop-form__form__middle__top__input__each__name"
                  className="laptop-form__form__middle__top__input__each__name-label"
                  style={errors.laptop_name ? { color: "#E52F2F" } : {}}
                >
                  CPU-ს ნაკადი
                </label>
                <input
                  type="number"
                  id="laptop-form__form__middle__top__input__each__name"
                  placeholder="365"
                  {...register("laptop_cpu_threads", {
                    required: true,
                    validate: {
                      hasSpecialChar: (v) => /^[0-9]+$/.test(v!.toString()),
                    },
                  })}
                  style={
                    errors.laptop_cpu_threads
                      ? { borderColor: "#E52F2F", outline: "none" }
                      : {}
                  }
                  value={
                    userInfo.laptop_cpu_threads !== null
                      ? userInfo.laptop_cpu_threads
                      : ""
                  }
                  onChange={(e) =>
                    saveInputsNumber(e.target.name, +e.target.value)
                  }
                />
                {errors.laptop_cpu_threads ? (
                  <p style={{ color: "#E52F2F" }}>მხოლოდ ციფრები</p>
                ) : (
                  <p>მხოლოდ ციფრები</p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="laptop-form__form__middle__bottom">
            <div className="laptop-form__form__top-left">
              <label
                htmlFor="laptop-form__form__top-left__name"
                className="laptop-form__form__top-left__name-label"
                style={errors.laptop_ram ? { color: "#E52F2F" } : {}}
              >
                ლეპტოპის სახელი
              </label>
              <input
                type="text"
                id="laptop-form__form__top-left__name"
                placeholder="HP"
                {...register("laptop_ram", {
                  required: true,
                  minLength: 2,
                  validate: {
                    hasSpecialChar: (v) => /^[0-9]+$/.test(v!.toString()),
                  },
                })}
                style={
                  errors.laptop_ram
                    ? { borderColor: "#E52F2F", outline: "none" }
                    : {}
                }
                value={
                  userInfo.laptop_cpu_threads !== null
                    ? userInfo.laptop_cpu_threads
                    : ""
                }
                onChange={(e) =>
                  saveInputsNumber(e.target.name, +e.target.value)
                }
              />
              {errors.laptop_ram ? (
                <p style={{ color: "#E52F2F" }}>
                  ლათინური ასოები, ციფრები, !@#$%^&*()_+=
                </p>
              ) : (
                <p>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</p>
              )}
            </div>
          </div> */}
        </div>
        <button>sda</button>
      </form>
    </div>
  );
};

export default LaptopForm;
