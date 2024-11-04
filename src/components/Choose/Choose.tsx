import React, { useState } from "react";
import styles from "./Choose.module.scss";
import setCookie from "../Cookies/setCookie";
import getCookie from "../Cookies/getCookie";

const Choose = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = ({option}: { option: any }) => {
    setSelectedOption(option);
    setCookie("option", option, 1);
    window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.option} ${selectedOption === "Pitac" ? styles["option--selected"] : ""}`}
        onClick={() => handleOptionClick({option: "Pitac"})}
      >
        Pitac
      </div>
      <div
        className={`${styles.option} ${selectedOption === "Garaza Pub" ? styles["option--selected"] : ""}`}
        onClick={() => handleOptionClick({option: "Garaza Pub"})}
      >
        Garaza Pub
      </div>
    </div>
  );
};

export default Choose;
