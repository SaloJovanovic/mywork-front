import React, { useState, useEffect } from "react";
import styles from "./Raspored.module.scss";
import Loader from "../Loader/Loader";
import getCookie from "../Cookies/getCookie";
import { useParams } from "react-router-dom";
import link from "../BackLink";
import account from "../Account/Account";

const Raspored = () => {

  const queryParameters = new URLSearchParams(window.location.search)
  let paramDate = "";

  const[rightArrowClicked, setRightArrowClicked] = useState(false);

  const[weekNote, setWeekNote] = useState("");
  const[popUp, setPopUp] = useState(false);
  const[eventPopUp, setEventPopUp] = useState(false);
  const[namesPopUp, setNamesPopUp] = useState(false);
  const[accountPopUp, setAccountPopUp] = useState(false);
  const[changeNameId, setChangeNameId] = useState("");
  const[changeName, setChangeName] = useState("");
  const[dates, setDates] = useState<Date[]>([]);
  const[daysInfo, setDaysInfo] = useState<any[]>([]);
  const[currentEmployeeIndex, setCurrentEmployeeIndex] = useState(-1);
  const[currentIndex, setCurrentIndex] = useState(-1);
  const[dayNote, setDayNote] = useState("");
  const[currentDate, setCurrentDate] = useState("");

  const[shift, setShift] = useState("");

  const[name, setName] = useState("");
  const[role, setRole] = useState("");

  const[startTime, setStartTime] = useState("");
  const[endTime, setEndTime] = useState("");

  const[dayNum, setDayNum] = useState(0);

  const submitShift = () => {
    updateShift(daysInfo[currentIndex].date, daysInfo[currentIndex].employeesIds[currentEmployeeIndex], shift);
  }

  const getAccount = async () => {
    const resp = await fetch(`${link}/account/get-account?id=${getCookie('id')}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((response) => response.json());
    setName(resp.name);
    setRole(resp.role);
  }

  const popUpClick = (employeeIndex: number, day: number, currentShift: string, currentStartTime: string, currentEndTime: string) => {
    setCurrentEmployeeIndex(employeeIndex);
    setCurrentIndex(day);
    setShift(currentShift);
    setStartTime(currentStartTime);
    setEndTime(currentEndTime);
    console.log(employeeIndex + " " + day)
    if (popUp)
      setPopUp(false)
    else
      setPopUp(true)
  }

  const[currentDayNoteDate, setCurrentDatNoteDate] = useState("");

  const eventPopUpClick = (note: string, date: string) => {
    setDayNote(note);
    setCurrentDatNoteDate(date);
    if (eventPopUp)
      setEventPopUp(false)
    else
      setEventPopUp(true)
  }

  const namesPopUpClick = (id: string) => {
    console.log(id);
    if (namesPopUp) {
      setChangeNameId("");
      setNamesPopUp(false);
    }
    else {
      setChangeNameId(id);
      setNamesPopUp(true);
    }
  }

  // var dt = new Date("2023-09-18");
  // dt.setDate(dt.getDate() - 2);
  // console.log("getDay() : " + dt.getDay() );

  // const getTodaysDate = async () => {
  //   const resp = await fetch('${link}/day/get-todays-date', {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     }
  //   })
  //   .then((response) => response.json());
  //   var todaysDate = new Date(resp);
  //   // var todaysDate = new Date("2023-09-25");
  //   const days = await createDay(resp);
  //   setDaysInfo(days);
  //   console.log("DAYS: " + days);
  // }

  function getOneWeekBeforeDate(inputDate: string): string {
    const date = new Date(inputDate);
    date.setDate(date.getDate() - 7); // Subtract 7 days to get one week before the input date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function getOneWeekAfterDate(inputDate: string): string {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 7); // Add 7 days to get one week after the input date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function isSecondDateMoreThan8DaysAfter(firstDate: string, secondDate: string): boolean {
    // Parse the formatted date strings into Date objects
    const firstFormattedDate: Date = new Date(firstDate);
    const secondFormattedDate: Date = new Date(secondDate);

    // Check if the second date is after the first date
    if (secondFormattedDate > firstFormattedDate) {
      // Calculate the difference in milliseconds between the two dates
      const timeDifference: number = secondFormattedDate.getTime() - firstFormattedDate.getTime();

      // Calculate the number of days between the two dates
      const daysDifference: number = timeDifference / (1000 * 3600 * 24);

      // Check if the difference is greater than or equal to 8 days
      console.log("--------------------- " + daysDifference);
      return daysDifference >= 7;
    }

    return false; // Second date is not after the first date
  }

  let tempParamDate = "";

  const getTodaysDate = async (weekBefore: boolean, weekAfter: boolean) => {

    console.log("AAAAAA 2")
    try {
      const resp = await fetch(`${link}/day/get-todays-date`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }

      const response = await resp.json();
      const date = new Date(response);
      var formattedDate = formatDateToYYYYMMDD(date);
      var todaysFormattedDate = formatDateToYYYYMMDD(date);
      if (paramDate === "date") {
        formattedDate = tempParamDate;
      }
      console.log("dan " + date.getDay())
      setDayNum(date.getDay());

      // if (params.date) {
      //   setCurrentDate(params.date);
      //   if (isSecondDateMoreThan8DaysAfter(formattedDate, params.date)) {
      //     console.log("NE MOZE DALJE ------------------------");
      //     return getOneWeekAfterDate(formattedDate);
      //   }
      //   return params.date;
      // }
      // setCurrentDate(formattedDate);

      // return formattedDate;
      if (currentDate !== "") {
        if (isSecondDateMoreThan8DaysAfter(formattedDate, currentDate) || isSecondDateMoreThan8DaysAfter(todaysFormattedDate, currentDate)) {
          console.log("NE MOZE DALJE");
          weekAfter = false;
        }
      }

      console.log("WEEK AFTER : " + weekAfter);


      // const fakeDate = getOneWeekBeforeDate(formattedDate);

      if (currentDate === "") {
        setCurrentDate(formattedDate);
      }

      if (currentDate === "" && weekBefore) {
        setCurrentDate(getOneWeekBeforeDate(formattedDate));
        return getOneWeekBeforeDate(formattedDate);
      }
      if (currentDate === "" && weekAfter) {
        setCurrentDate(getOneWeekAfterDate(formattedDate));
        return getOneWeekAfterDate(formattedDate);
      }
      if (currentDate === "") {
        setCurrentDate(formattedDate);
        return formattedDate;
      }
      if (currentDate !== "" && weekBefore) {
        setCurrentDate(getOneWeekBeforeDate(currentDate));
        return getOneWeekBeforeDate(currentDate);
      }
      if (currentDate !== "" && weekAfter) {
        setCurrentDate(getOneWeekAfterDate(currentDate));
        return getOneWeekAfterDate(currentDate);
      }
      if (currentDate !== "") {
        setCurrentDate(currentDate);
        return currentDate;
      }

      // Now call createDay separately
      // const days = await createDay(formattedDate);

      // Update your component state with the fetched data
      // setDaysInfo(days);
    } catch (error) {
      console.error("Error getting today's date:", error);
    }
  };

  const getWeekFromBackend = async (inputDate: string) => {
    try {
      // Construct the URL for the getWeek endpoint with the input date as a query parameter
      const url = `${link}/day/get-week?inputDate=${inputDate}`;

      // Make a GET request to the backend
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();
      console.log("Week data:", data);
      return data;
    } catch (error) {
      console.error("Error getting week data:", error);
      return null;
    }
  };

  const updateShift = async (date: string, id: string, shift: string) => {
    try {
      const response = await fetch(`${link}/day/updateShift?date=${date}&id=${id}&newShift=${shift}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          date: date,
          shifts: [],
          startTimes: [],
          endTimes: [],
          weekNote: "",
          dayNote: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Shift updated");


      updateTime(daysInfo[currentIndex].date, daysInfo[currentIndex].employeesIds[currentEmployeeIndex], startTime, endTime)

      return true;
    } catch (error) {
      console.error("Error updating shift:", error);
      return false;
    }
  }

  const createSalary = async (date: string, id: string) => {
    try {
      const response = await fetch(`${link}/salary/create?date=${date}&accountId=${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Shift updated");

      return true;
    } catch (error) {
      console.error("Error updating shift:", error);
      return false;
    }
  }

  const updateName = async (id: string) => {
    try {
      const response = await fetch(`${link}/account/change-username?id=${changeNameId}&newName=${changeName}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Time updated");
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return true;
    } catch (error) {
      console.error("Error updating name:", error);
      return false;
    }
  }

  const changeEmployeeStatus = async (id: string) => {
    try {
      const response = await fetch(`${link}/day/changeStatus?accountId=${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Status updated!");
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return true;
    } catch (error) {
      console.error("Error while changing status: ", error);
    }
  }


  const updateTime = async (date: string, id: string, startTime: string, endTime: string) => {
    try {
      const response = await fetch(`${link}/day/updateTime?date=${date}&id=${id}&startTime=${startTime}&endTime=${endTime}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Time updated");
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return true;
    } catch (error) {
      console.error("Error updating time:", error);
      return false;
    }
  }

  const updateDayNote = async (date: string, newDayNote: string) => {
    try {
      const response = await fetch(`${link}/day/updateDayNote?date=${date}&newDayNote=${newDayNote}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Day note updated");
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return true;
    } catch (error) {
      console.error("Error updating day note:", error);
      return false;
    }
  }

  const updateWeekNote = async (date: string, newWeekNote: string) => {
    try {
      console.log(date + " " + newWeekNote)
      const response = await fetch(`${link}/day/updateWeekNote?date=${date}&newWeekNote=${newWeekNote}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Week note updated");
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return true;
    } catch (error) {
      console.error("Error updating week note:", error);
      return false;
    }
  }

  const createDay = async (date: string | undefined) => {
    console.log("AAAAAA 3 " + date)
    try {
      console.log("pre poziva")
      const response = await fetch(`${link}/day/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          date: date,
          shifts: [],
          startTimes: [],
          endTimes: [],
          weekNote: "",
          dayNote: "",
        }),
      });
      console.log("posle poziva")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Create day:", data);
      setDaysInfo(data)
      setLoader(false);
      console.log("setovao loader na false")
      return data;
    } catch (error) {
      console.error("Error creating day:", error);
      return [];
    }
  };

  const[accountName, setAccountName] = useState("");
  const[accountUsername, setAccountUsername] = useState("");
  const[accountPassword, setAccountPassword] = useState("");
  const[accountRole, setAccountRole] = useState("");
  const[hourlyRate, setHourlyRate] = useState(0.0);
  const[fixedSalary, setFixedSalary] = useState(0.0);
  const[usernameTaken, setUsernameTaken] = useState(false);

  const createAccount = async () => {
    try {
      console.log("pre poziva")
      const response = await fetch(`${link}/account/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: accountName,
          username: accountUsername,
          password: accountPassword,
          role: accountRole,
          hourlyRate: hourlyRate,
          fixedSalary: fixedSalary
        }),
      });
      console.log("posle poziva")

      if (!response.ok) {
        if (response.status === 403) {
          setUsernameTaken(true);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setUsernameTaken(false);

      const data = await response.json();
      console.log("Create account:", data);
      // setDaysInfo(data)
      window.location.href = `/raspored?date=${currentDate || currentDate !== "" ? currentDate : getTodaysDate(false, false)}`;
      return data;
    } catch (error) {
      console.error("Error creating account: ", error);
      return [];
    }
  };


  function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDate(inputDateStr: string): string {
    // Parse the input date string into a Date object
    const inputDate = new Date(inputDateStr);

    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
      month: 'short', // Short month name (e.g., "Sep")
      day: '2-digit', // Two-digit day (e.g., "19")
    };

    // Format the date as "Mon dd" (e.g., "Sep 19")
    return inputDate.toLocaleDateString(undefined, options);
  }

  const fetchData = async (weekBefore: boolean, weekAfter: boolean) => {
    // const todaysDate = await getTodaysDate(weekBefore, weekAfter);
    console.log("PARAMDATEEEEEEEEEE " + paramDate);
    if (paramDate === null || paramDate === "") {
      console.log("PARAMDATE JE NUll");
      createDay(await getTodaysDate(weekBefore, weekAfter))
    }
    else {
      getTodaysDate(weekBefore, weekAfter);
      let paramDateTemp = paramDate;
      paramDate = "date";
      createDay(paramDateTemp);
    }
    // createDay(todaysDate);
    // window.location.href = `/raspored?date=${todaysDate}`;
  };

  const[loader, setLoader] = useState(false);

  // const[undefinedName, setUndefinedName] = useState(false);
  let undefinedName = false;

  useEffect(() => {
    console.log("DRUGO AJDE")
    const runIt = () => {
      console.log("TRECE AJDE")
      paramDate = queryParameters.get("date") ?? "";
      tempParamDate = paramDate;
      setLoader(true);
      fetchData(false, false);
      getAccount();
    }
    // return () => runIt();
    runIt()
  }, []);

  console.log("AJDEEEEE")

  return (
    <>
      {
        loader ?
          <Loader></Loader>
          :
          <div className={styles.container}>
            <div className={popUp || eventPopUp || namesPopUp || accountPopUp ? styles.blur + " " + styles.active : styles.blur}></div>
            <div className={popUp ? styles.popUp + " " + styles.active : styles.popUp}>
              <button className={shift === "I" ? styles.focused : styles.button} onClick={() => setShift("I")}>I</button>
              {/* <button onClick={() => updateShift(daysInfo[currentIndex].date, daysInfo[currentIndex].employeesIds[currentEmployeeIndex], "II")}>II</button> */}
              <button className={shift === "II" ? styles.focused : styles.button} onClick={() => setShift("II")}>II</button>
              {
                role === "direktor" ?
                  <div className={styles.time2}>
                    <input onChange={(e) => setStartTime(e.target.value)} value={startTime} type="time"/>
                    <input onChange={(e) => setEndTime(e.target.value)} value={endTime} type="time"/>
                  </div>
                  :
                  <div className={styles.time}>
                    <p>{startTime} - {endTime}</p>
                  </div>
              }
              {
                role === "direktor" || dayNum !== 0 ?
                  <button id={styles.ponisti} onClick={() => {
                    setShift("0");
                    setStartTime("00:00");
                    setEndTime("00:00");
                  }}>Ponisti</button>
                  :
                  <></>
              }
              <button id={styles.nazad} onClick={() => popUpClick(-1, -1, "", "", "")}>Nazad</button>
              {
                role === "direktor" || dayNum !== 0 ?
                  <button onClick={() => submitShift()}>Potvrdi</button>
                  :
                  <></>
              }
            </div>
            {
              role === "direktor" ?
                <div id={styles.eventPopUp} className={eventPopUp ? styles.popUp + " " + styles.active + " " + styles.eventPopUp : styles.popUp + " " + styles.eventPopUp}>
                  <textarea value={dayNote} onChange={(e) => setDayNote(e.target.value)}/>
                  <button id={styles.nazad} onClick={() => eventPopUpClick("pon", "")}>Nazad</button>
                  <button id={styles.potvrdi} onClick={() => updateDayNote(currentDayNoteDate, dayNote)}>Potvrdi</button>
                </div>
                :
                <div id={styles.eventPopUp} className={eventPopUp ? styles.popUp + " " + styles.active + " " + styles.eventPopUp : styles.popUp + " " + styles.eventPopUp}>
                  <p>{dayNote}</p>
                  <button id={styles.nazad} onClick={() => eventPopUpClick("pon", "")}>Nazad</button>
                </div>
            }
            {
              role === "direktor" ?
                <div id={styles.namesPopUp} className={namesPopUp ? styles.popUp + " " + styles.active + " " + styles.namesPopUp : styles.popUp + " " + styles.namesPopUp}>
                  {/*<textarea value={changeName} onChange={(e) => setChangeName(e.target.value)}/>*/}
                  <p>{changeName}</p>
                  <button id={styles.nazad} onClick={() => namesPopUpClick("")}>Nazad</button>
                  <button id={styles.obrisi} onClick={() => changeEmployeeStatus(changeNameId)}>Obrisi</button>
                  <button id={styles.potvrdi} onClick={() => updateName(changeNameId)}>Potvrdi</button>
                </div>
                :
                <></>
            }
            {
              role === "direktor" ?
                <div id={styles.accountPopUp} className={accountPopUp ? styles.popUp + " " + styles.active + " " + styles.accountPopUp : styles.popUp + " " + styles.accountPopUp}>
                  <input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder={"Name"}></input>
                  <input value={accountUsername} onChange={(e) => setAccountUsername(e.target.value)} placeholder={"Username"}></input>
                  <input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} placeholder={"Passsword"}></input>
                  <input value={accountRole} onChange={(e) => setAccountRole(e.target.value)} placeholder={"Role"}></input>
                  <p id={styles.hourlyRate}>Hourly Rate (rsd):</p>
                  <input value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value))} placeholder={"Hourly rate"}></input>
                  <p id={styles.hourlyRate}>Fixed Salary (rsd):</p>
                  <input value={fixedSalary} onChange={(e) => setFixedSalary(parseFloat(e.target.value))} placeholder={"Fixed salary"}></input>
                  <button id={styles.nazad} onClick={() => {
                    setAccountPopUp(false);
                    setAccountName("");
                    setAccountUsername("");
                    setAccountPassword("");
                    setAccountRole("");
                    setHourlyRate(0.0);
                    setFixedSalary(0.0);
                  }}>Nazad</button>
                  <button id={styles.potvrdi} onClick={() => createAccount()}>Potvrdi</button>
                  {
                    usernameTaken ?
                      <p>Username taken.</p>
                      :
                      <></>
                  }
                </div>
                :
                <></>
            }
            <table>
              <tr>
                <th>Ime</th>
                <th
                  onClick={() => {
                    if (daysInfo[0]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[0]?.dayNote, daysInfo[0]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[0]?.dayNote, daysInfo[0]?.date);
                    }
                  }}
                  className={daysInfo[0]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[0]?.date)}</p>
                    Pon
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[1]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[1]?.dayNote, daysInfo[1]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[1]?.dayNote, daysInfo[1]?.date);
                    }
                  }}
                  className={daysInfo[1]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[1]?.date)}</p>
                    Uto
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[2]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[2]?.dayNote, daysInfo[2]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[2]?.dayNote, daysInfo[2]?.date);
                    }
                  }}
                  className={daysInfo[2]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[2]?.date)}</p>
                    Sre
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[3]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[3]?.dayNote, daysInfo[3]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[3]?.dayNote, daysInfo[3]?.date);
                    }
                  }}
                  className={daysInfo[3]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[3]?.date)}</p>
                    Cet
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[4]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[4]?.dayNote, daysInfo[4]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[4]?.dayNote, daysInfo[4]?.date);
                    }
                  }}
                  className={daysInfo[4]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[4]?.date)}</p>
                    Pet
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[5]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[5]?.dayNote, daysInfo[5]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[5]?.dayNote, daysInfo[5]?.date);
                    }
                  }}
                  className={daysInfo[5]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[5]?.date)}</p>
                    Sub
                  </>
                </th>
                <th
                  onClick={() => {
                    if (daysInfo[6]?.dayNote !== "") {
                      eventPopUpClick(daysInfo[6]?.dayNote, daysInfo[6]?.date);
                    }
                    if (role === "direktor") {
                      eventPopUpClick(daysInfo[6]?.dayNote, daysInfo[6]?.date);
                    }
                  }}
                  className={daysInfo[6]?.dayNote !== "" ? styles.napomena : styles.obicno}
                >
                  <>
                    <p>{formatDate(daysInfo[6]?.date)}</p>
                    Ned
                  </>
                </th>
              </tr>
              {daysInfo.map((day, index) => {
                const employeeIndex = (index % day?.employeesNames.length) + 1;
                console.log("Employee name: " + day.employeesNames[employeeIndex]);
                if (day.employeesNames[employeeIndex] === undefined || undefinedName) {
                  undefinedName = true;
                  return null;
                }
                return (
                  <tr key={index}>
                    {
                      role === "direktor" ?
                      <td onClick={() => {
                        setChangeName(day?.employeesNames[employeeIndex]);
                        namesPopUpClick(day?.employeesIds[employeeIndex]);
                      }}>{day?.employeesNames[employeeIndex]}</td>
                        :
                      <td>{day?.employeesNames[employeeIndex]}</td>
                    }
                    {daysInfo.map((day1, index1) => {
                      return (
                        <td key={index1}>
                          <button onClick={() => {
                            // if (dayNum !== 0 || role === "direktor") {
                            if (getCookie('id') === day?.employeesIds[employeeIndex] || role === "direktor") {
                              popUpClick(employeeIndex, index1, day1.shifts[index], day1.startTimes[index], day1.endTimes[index])
                            }
                            // }
                            console.log("impossible");
                          }}>
                            {day1.shifts[index]}
                            <div className={styles.times}>
                              <p>{day1.startTimes[index]} {day1.endTimes[index]}</p>
                            </div>
                          </button>
                        </td>
                      )})}
                  </tr>
                );
              })}
              {/* <tr>
          <td>{daysInfo[1]?.employeesNames[1]}</td>
          <td>
            <button onClick={() => popUpClick()}>?</button>
          </td>
          <td>
            <button>I</button>
          </td>
          <td>
            <button>II</button>
          </td>
        </tr> */}
            </table>
            <div className={styles.weekNote}>
              {
                role === "direktor" ?
                  <div className={styles.weekNoteSubContainer}>
                    <button onClick={() => {
                      // window.location.href = `/rasproed?date=${getOneWeekBeforeDate(currentDate)}`
                      fetchData(true, false);
                    }} className={styles.arrow}>
                      <span></span>
                    </button>
                    <div>
                      <button onClick={() => setAccountPopUp(true)} className={styles.addAccountBtn}>+</button>
                      <h2>Napomena</h2>
                      <textarea onChange={(e) => setWeekNote(e.target.value)}>{daysInfo[0]?.weekNote}</textarea>
                      <button onClick={() => updateWeekNote(daysInfo[0]?.date, weekNote)} id={styles.potvrdi}>Potvrdi</button>
                    </div>
                    <button onClick={() => {
                      // window.location.href = `/rasproed?date=${getOneWeekAfterDate(currentDate)}`
                      fetchData(false, true);
                    }} className={styles.arrow2}>
                      <span></span>
                    </button>
                  </div>
                  :
                  <div className={styles.weekNoteSubContainer}>
                    <button disabled={rightArrowClicked ? false : true} onClick={() => {
                      // window.location.href = `/rasproed?date=${getOneWeekBeforeDate(currentDate)}`
                      fetchData(true, false);
                      setRightArrowClicked(false);
                    }} className={styles.arrow}>
                      <span></span>
                    </button>
                    <div>
                      <h2>Napomena</h2>
                      <p>{daysInfo[0]?.weekNote}</p>
                    </div>
                    <button onClick={() => {
                      // window.location.href = `/rasproed?date=${getOneWeekAfterDate(currentDate)}`
                      setRightArrowClicked(true);
                      fetchData(false, true);
                    }} className={styles.arrow2}>
                      <span></span>
                    </button>
                  </div>
              }
            </div>
          </div>
      }
    </>
  )
}

export default Raspored;