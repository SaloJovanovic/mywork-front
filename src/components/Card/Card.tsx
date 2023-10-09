import React, { FC } from "react";
import styles from './Card.module.scss';

interface CardComponents {
  icon: any;
  name: string;
  text: string;
}

const Card : React.FC<CardComponents> = ({icon, name, text}) => {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        {/* <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z"
          />
        </svg> */}
        {icon}
      </span>
      <h4>{name}</h4>
      <p>
        {text}
      </p>
      <div className={styles.shine}></div>
      <div className={styles.background}>
        <div className={styles.tiles}>
          <div className={styles.tile + " " +  styles.tile1}></div>
          <div className={styles.tile + " " + styles.tile2}></div>
          <div className={styles.tile + " " + styles.tile3}></div>
          <div className={styles.tile + " " + styles.tile4}></div>

          <div className={styles.tile + " " + styles.tile5}></div>
          <div className={styles.tile + " " + styles.tile6}></div>
          <div className={styles.tile + " " + styles.tile7}></div>
          <div className={styles.tile + " " + styles.tile8}></div>

          <div className={styles.tile + " " + styles.tile9}></div>
          <div className={styles.tile + " " + styles.tile10}></div>
        </div>

        <div className={styles.line + " " + styles.line1}></div>
        <div className={styles.line + " " + styles.line2}></div>
        <div className={styles.line + " " + styles.line3}></div>
      </div>
    </div>
  )
}

export default Card;