import React, {useEffect, useState} from "react";
import styles from "./MonthlyReport.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader/Loader";
import { FaRegEdit } from "react-icons/fa";
import link from "../BackLink";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

interface Salary {
  accountId: string;
  name: string;
  username: string;
  role: string;
  hourlyRate: number;
  active: number;
  salary: number;
}

const MonthlyReport = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [salaryFilter, setSalaryFilter] = useState<string>('greaterThanZero'); // 'all', 'greaterThanZero', 'equalsZero'

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSalaryFilter(event.target.value);
  };

  const[loader, setLoader] = useState(false);

  const fetchData = async () => {
    try {
      if (selectedDate) {
        setLoader(true);
        const formattedDate = getFirstDayOfMonth(selectedDate);

        // Create or update salaries using POST method
        await fetch(`${link}/salary/createAll?date=${formattedDate}`, {
          method: 'POST',
        });

        // Fetch salaries
        const response = await fetch(`${link}/salary/get?date=${formattedDate}`);
        const data = await response.json();

        // Apply filter based on salaryFilter value
        const filteredSalaries = applySalaryFilter(data, salaryFilter);
        setSalaries(filteredSalaries);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error fetching or creating/updating salaries:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedDate, salaryFilter]);

  const applySalaryFilter = (data: Salary[], filter: string) => {
    if (filter === 'greaterThanZero') {
      return data.filter((salary) => salary.salary > 0);
    } else if (filter === 'equalsZero') {
      return data.filter((salary) => salary.salary === 0);
    } else {
      return data; // 'all' filter, no filtering applied
    }
  };

  const getFirstDayOfMonth = (date: Date | null) => {
    if (!date) return null;
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
    const formattedDate = firstDay.toISOString().split('T')[0];
    return formattedDate;
  };

  const[edit, setEdit] = useState(false);

  const[accountId, setAccountId] = useState("");
  const[hourlyRate, setHourlyRate] = useState(0.0);
  const[fixedSalary, setFixedSalary] = useState(0.0);

  const editClicked = (accountId: string, hourlyRate: number, fixedSalary: number) => {
    setAccountId(accountId);
    setHourlyRate(hourlyRate);
    setFixedSalary(fixedSalary);
    setPopUp(true);
  }

  const[popUp, setPopUp] = useState(false);

  const nazadClicked = () => {
    setAccountId("");
    setHourlyRate(0.0);
    setPopUp(false);
  }

  const changeHourlyRate = async () => {
    try {
      console.log("pre poziva")
      const response = await fetch(`${link}/account/changeHourlyRate?id=${accountId}&newHourlyRate=${hourlyRate}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log("posle poziva")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      console.log("setovao loader na false")

      fetchData();
      return data;
    } catch (error) {
      console.error("Error creating day:", error);
      return [];
    }
  }

  const changeFixedSalary = async () => {
    try {
      console.log("pre poziva")
      const response = await fetch(`${link}/account/change-fixedSalary?id=${accountId}&newFixedSalary=${fixedSalary}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log("posle poziva")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      console.log("setovao loader na false")

      fetchData();
      return data;
    } catch (error) {
      console.error("Error creating day:", error);
      return [];
    }
  }

  return (
    <>
    {
      loader ?
        <Loader></Loader>
        :
        <div className={styles.container}>
          <div className={popUp? styles.blur + " " + styles.active : styles.blur}></div>
          <div className={popUp ? styles.popUp + " " + styles.active : styles.popUp}>
            <input onChange={(e) => {
              setHourlyRate(parseFloat(e.target.value));
            }} value={hourlyRate}/>
            <button onClick={() => changeHourlyRate()}>Potvrdi satnicu</button>
            <input onChange={(e) => {
              setFixedSalary(parseFloat(e.target.value));
            }} value={fixedSalary}/>
            <button onClick={() => changeFixedSalary()}>Potvrdi fiksnu platu</button>
            <button id={styles.nazad} onClick={() => nazadClicked()}>Nazad</button>
          </div>
          <DatePicker
            className={styles.datePicker}
            selected={selectedDate}
            onChange={handleDateChange}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            placeholderText="Select a month"
          />
          {/*<div>*/}
          {/*  {selectedDate && (*/}
          {/*    <p>First day of selected month: {getFirstDayOfMonth(selectedDate)}</p>*/}
          {/*  )}*/}
          {/*</div>*/}
          {/* Dropdown for selecting salary filter */}
          <label>
            Filter by Salary:
            <select value={salaryFilter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="greaterThanZero">Greater than 0</option>
              <option value="equalsZero">Equals to 0</option>
            </select>
          </label>
          <ul>
            {salaries.map((salary) => (
              <li key={salary.accountId}>
                <button onClick={() => editClicked(salary.accountId, salary.hourlyRate, salary.salary)}><FaRegEdit></FaRegEdit></button>
                <p><span>Name:</span> {salary.name}</p>
                <p><span>Username:</span> {salary.username}</p>
                <p><span>Role:</span> {salary.role}</p>
                {/*<p><span>Hourly Rate:</span> <input value={salary.hourlyRate}/> rsd</p>*/}
                <p><span>Hourly Rate:</span> {salary.hourlyRate} rsd</p>
                {
                  salary.active ?
                    <p><span>Active:</span> Yes</p>
                    :
                    <p><span>Active:</span> No</p>
                }
                <p><span>Salary:</span> {salary.salary} rsd</p>
              </li>
            ))}
          </ul>
        </div>
    }
    </>
  );
};


export default MonthlyReport;