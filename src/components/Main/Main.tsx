import React from 'react';
import styles from './Main.module.scss';
import { defaultMaxListeners } from 'events';
import Card from '../Card/Card';
import { BsFillCalendar2DateFill, BsFillFileEarmarkRuledFill, BsQuestionLg } from 'react-icons/bs'; 
import { FaTasks } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";
import link from "../BackLink";
import { useState, useEffect } from "react";
import setCookie from "../Cookies/setCookie";
import getCookie from "../Cookies/getCookie";

const Main = () => {

  const[role, setRole] = useState("");
  const[error, setError] = useState(false);
  const[success, setSuccess] = useState(false);

  const getAccount = async () => {
    console.log(getCookie('id'))
    const resp = await fetch(`${link}/account/get-account?id=${getCookie('id')}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then((response) => response.json());
    setRole(resp.role);
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <a href={'/raspored'}>
          <Card icon={<BsFillCalendar2DateFill/>} name="Raspored" text='Izaberite i pogledajte smene za sledeću nedelju.'></Card>
        </a>
        <a href={'/pravilnici'}>
          <Card icon={<BsFillFileEarmarkRuledFill/>} name="Pravilnici" text='Uvek je dobro prisetiti se pravilnika. Klikni ovde i pročitaj!'></Card>
        </a>
        <a href={'/nedeljni-mesecni-zadaci'}>
          <Card icon={<FaTasks/>} name="Nedeljni i mesečni zadaci" text='Pogledaj svoje nedeljne i mesečne zadatke, štikliraj ako si ih uradio!'></Card>
        </a>
        {
          role === "direktor" ?
          <a href={'/mesecni-izvestaj'}>
            <Card icon={<TbReport/>} name={"Mesečni izveštaj"} text={"Pogledaj mesečne izveštaje za ovaj mesec"}></Card>
          </a>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Main;