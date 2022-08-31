import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { LaptopUseForm } from "../../utilities/interfaces";

import ExclLarge from "../../assets/images/excl-large.svg";
import ExclSmall from "../../assets/images/excl-small.svg";
import Camera from "../../assets/images/camera.svg";

import "../../styles/form/LaptopForm.scss";

const LaptopForm = () => {
  const [laptopInfo, setLaptopInfo] = useState<LaptopUseForm>({
    laptop_name: "",
    laptop_image: "",
    laptop_brand_id: null,
    laptop_cpu: "",
    laptop_cpu_cores: null,
    laptop_cpu_threads: null,
    laptop_ram: null,
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LaptopUseForm>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const transformImage = (files: any) => {
    console.log(files[0]);
  };

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
        <button>sda</button>
      </form>
    </div>
  );
};

export default LaptopForm;
