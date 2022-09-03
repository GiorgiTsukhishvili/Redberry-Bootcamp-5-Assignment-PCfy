import React, { createContext, ReactNode, useState, useEffect } from "react";

import { WholeInfo } from "../utilities/interfaces";

interface FormContextProps {
  userInfo: WholeInfo;
  setUserInfo: (info: WholeInfo) => void;
}

let data: WholeInfo;
const local = localStorage.getItem("user");

if (local !== null) {
  data = JSON.parse(local);
} else {
  data = {
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    team_id: null,
    position_id: null,
    token: "2d20b5112d1d7d3d395f0a3671c78b62",
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
  };
}



export const FormContext = createContext({} as FormContextProps);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<WholeInfo>(data);

  useEffect(() => {
    const fromLocal = localStorage.getItem("user");
    if (fromLocal) {
      setUserInfo({ ...userInfo, ...JSON.parse(fromLocal) });
    }
  }, []);

  useEffect(() => {
    let time: any;

    // გადავწყვიტე რო 1 წამიანი თაიმაუთი გამეკეთებინა რომ ყოველ პატარა ჩაწერაზე არ
    // შემეწუხებინა ლოქალ სთორეჯი, ასე როცა დაამტავრებს ვინმე წერას 1 წამში შეივსება

    time = setTimeout(
      () => localStorage.setItem("user", JSON.stringify(userInfo)),
      1000
    );

    return () => clearTimeout(time);
  }, [userInfo]);

  return (
    <FormContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </FormContext.Provider>
  );
};
