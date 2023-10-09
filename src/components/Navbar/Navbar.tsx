import React, {useState} from "react";
import styles from "./Navbar.module.scss";
import {BrowserRouter, Link} from 'react-router-dom';
import { RiMoneyDollarBoxFill } from 'react-icons/ri'; 
import { GiLightningHelix } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import { HiUser } from 'react-icons/hi';
import logo from '../../images/logo_rmbg.png';

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <ul className={styles.navbar_nav}>
        <li className={styles.logo}>
          <Link className={styles.nav_link} to={'/'}>
            <span className={styles.link_text}>PITAC</span>
            {/* <GiLightningHelix className={styles.icon}></GiLightningHelix> */}
            <img className={styles.icon} src={logo}></img>
          </Link>
        </li>

        <li className={styles.nav_item}>
          <Link className={styles.nav_link} to={'/'}>
            <AiFillHome className={styles.icon}></AiFillHome>
            <span className={styles.link_text}>Početna</span>
          </Link>
        </li>

        <li className={styles.nav_item}>
          <Link className={styles.nav_link} to={'/raspored'}>
            <BsFillCalendar2DateFill className={styles.icon}></BsFillCalendar2DateFill>
            <span className={styles.link_text}>Raspored</span>
          </Link>
        </li>

        <li className={styles.nav_item}>
          <Link className={styles.nav_link} to={'/nalog'}>
            <HiUser className={styles.icon}></HiUser>
            <span className={styles.link_text}>Nalog</span>
          </Link>
        </li>

        {/* <li className={styles.nav_item}>
          <Link className={styles.nav_link} to={'#'}>
            <>
              {}
            </>
          </Link>
        </li> */}
      </ul>
    </div>
  )
}

export default Navbar;