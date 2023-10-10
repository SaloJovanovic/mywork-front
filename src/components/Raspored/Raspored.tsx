import React, { useState, useEffect } from "react";
import styles from "./Raspored.module.scss";
import Loader from "../Loader/Loader";
import getCookie from "../Cookies/getCookie";

const Raspored = () => {

  const[weekNote, setWeekNote] = useState("");
  const[popUp, setPopUp] = useState(false);
  const[eventPopUp, setEventPopUp] = useState(false);
  const[dates, setDates] = useState<Date[]>([]);
  const[daysInfo, setDaysInfo] = useState<any[]>([]);
  const[currentEmployeeIndex, setCurrentEmployeeIndex] = useState(-1);
  const[currentIndex, setCurrentIndex] = useState(-1);
  const[dayNote, setDayNote] = useState("");

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
    const resp = await fetch(`https://web-production-08b6.up.railway.app/account/get-account?id=${getCookie('id')}`, {
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

  // var dt = new Date("2023-09-18");
  // dt.setDate(dt.getDate() - 2);
  // console.log("getDay() : " + dt.getDay() );
  
  // const getTodaysDate = async () => {
  //   const resp = await fetch('https://web-production-08b6.up.railway.app/day/get-todays-date', {
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
  const getTodaysDate = async () => {
    
    console.log("AAAAAA 2")
    try {
      const resp = await fetch('https://web-production-08b6.up.railway.app/day/get-todays-date', {
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
      const formattedDate = formatDateToYYYYMMDD(date);
      console.log("dan " + date.getDay())

      setDayNum(date.getDay());

      return formattedDate;
      
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
      const url = `https://web-production-08b6.up.railway.app/day/get-week?inputDate=${inputDate}`;
      
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
      const response = await fetch(`https://web-production-08b6.up.railway.app/day/updateShift?date=${date}&id=${id}&newShift=${shift}`, {
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

  
  const updateTime = async (date: string, id: string, startTime: string, endTime: string) => {
    try {
      const response = await fetch(`https://web-production-08b6.up.railway.app/day/updateTime?date=${date}&id=${id}&startTime=${startTime}&endTime=${endTime}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Time updated");
      window.location.href="/raspored"
      return true;
    } catch (error) {
      console.error("Error updating time:", error);
      return false;
    }
  }

  const updateDayNote = async (date: string, newDayNote: string) => {
    try {
      const response = await fetch(`https://web-production-08b6.up.railway.app/day/updateDayNote?date=${date}&newDayNote=${newDayNote}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Day note updated");
      window.location.href="/raspored"
      return true;
    } catch (error) {
      console.error("Error updating day note:", error);
      return false;
    }
  }

  const updateWeekNote = async (date: string, newWeekNote: string) => {
    try {
      console.log(date + " " + newWeekNote)
      const response = await fetch(`https://web-production-08b6.up.railway.app/day/updateWeekNote?date=${date}&newWeekNote=${newWeekNote}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Week note updated");
      window.location.href="/raspored"
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
      const response = await fetch("https://web-production-08b6.up.railway.app/day/create", {
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
  
  const fetchData = async () => {
    createDay(await getTodaysDate())
  };

  const[loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("DRUGO AJDE")
    const runIt = () => {
      console.log("TRECE AJDE")
      setLoader(true);
      fetchData();
      getAccount();
    }
    return () => runIt();
  }, []);

  console.log("AJDEEEEE")
  
  return (
    <>
    {
      loader ?
      <Loader></Loader>
      :
    <div className={styles.container}>
      <div className={popUp || eventPopUp ? styles.blur + " " + styles.active : styles.blur}></div>
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
        return (
          <tr key={index}>
            <td>{day?.employeesNames[employeeIndex]}</td>
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
                    <p>{day1.startTimes[index]} - {day1.endTimes[index]}</p>
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
          <div>
            <h2>Napomena</h2>
            <textarea onChange={(e) => setWeekNote(e.target.value)}>{daysInfo[0]?.weekNote}</textarea>
            <button onClick={() => updateWeekNote(daysInfo[0]?.date, weekNote)} id={styles.potvrdi}>Potvrdi</button>
          </div>
          :
          <div>
            <h2>Napomena</h2>
            <p>{daysInfo[0]?.weekNote}</p>
          </div>
        }
      </div>
    </div>
      }
      </>
  )
}

export default Raspored;