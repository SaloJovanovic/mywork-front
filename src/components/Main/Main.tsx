import React from 'react';
import styles from './Main.module.scss';
import { defaultMaxListeners } from 'events';
import Card from '../Card/Card';
import { BsFillCalendar2DateFill, BsFillFileEarmarkRuledFill, BsQuestionLg } from 'react-icons/bs'; 
import { FaTasks } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";

const Main = () => {
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
        <a href={'/mesecni-izvestaj'}>
          <Card icon={<TbReport/>} name={"Mesečni izveštaj"} text={"Pogledaj mesečne izveštaje za ovaj mesec"}></Card>
        </a>
      </div>
    </div>
  )
}

export default Main;