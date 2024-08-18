import React from "react";
import styles from "./Regulations.module.scss";
import Card from "../Card/Card";
import {BsFillCalendar2DateFill, BsFillFileEarmarkRuledFill} from "react-icons/bs";
import DocViewer from "react-doc-viewer";

const Regulations = () => {

  const docs = [
    { uri: require("../../documents/0_OPSTA_PRAVILA_PONASANJA_OSOBLJA.docx") },
    { uri: require("../../documents/1 KONOBARI, SANKERI I UPSELING.docx") },
    { uri: require("../../documents/2 KUVAR I POMOCNI KUVAR.docx") },
    { uri: require("../../documents/4 HIGIJENICAR - CUVAR.docx") },
    { uri: require("../../documents/CEK LISTE.docx") },
    { uri: require("../../documents/PREZENTACIJA JELA.docx") },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.naslov}>Pravilnici</h1>
      <div className={styles.cards}>
        {/*<a href={'../../documents/0_OPSTA_PRAVILA_PONASANJA_OSOBLJA.docx'} download={"0_OPSTA_PRAVILA_PONASANJA_OSOBLJA.docx"}>*/}
        {/*  <Card icon={<BsFillFileEarmarkRuledFill/>} name="Pravilnici"*/}
        {/*        text='Uvek je dobro prisetiti se pravilnika. Klikni ovde i pročitaj!'></Card>*/}
        {/*</a>*/}
        <DocViewer documents={docs} theme={{
          primary: "var(--yellow)",
          secondary: "black",
          tertiary: "var(--yellow)",
          text_primary: "#ffffff",
          text_secondary: "var(--yellow)",
          text_tertiary: "#00000099",
          disableThemeScrollbar: false,
        }}/>
      </div>
    </div>
  )
}

export default Regulations;