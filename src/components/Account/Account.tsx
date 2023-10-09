import React, {useState, useEffect} from 'react';
import styles from "./Account.module.scss";
import getCookie from "../Cookies/getCookie";
import deleteCookie from "../Cookies/deleteCookie";

const Account = () => {

  const[name, setName] = useState("");
  const[role, setRole] = useState("");
  const[oldPassword, setOldPassword] = useState("");
  const[newPassword, setNewPassword] = useState("");
  const[error, setError] = useState(false);
  const[success, setSuccess] = useState(false);

  const changePassword = async () => {
    const resp = await fetch(`https://web-production-08b6.up.railway.app/account/change-password?id=${getCookie('id')}&oldPassword=${oldPassword}&newPassword=${newPassword}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then((response) => response.json());
    if (!resp) {
      console.log("Greska");
      setError(true);
      setSuccess(false);
    }
    else {
      console.log("Uspesno promenjena sifra");
      setError(false);
      setSuccess(true);
    }
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

  useEffect(() => {
    getAccount();
  }, []);

  const odjava = () => {
    deleteCookie('id');
    deleteCookie('loggedIn');
    deleteCookie('token');
    window.location.href='/';
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <p>{role}</p>
        <form className={styles.card}>
          <input type="password" placeholder="Stara šifra"
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}/>
          <input type="password" placeholder="Nova šifra"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          />
          <button onClick={(e) => {e.preventDefault(); changePassword();}}>Promeni Šifru</button>
          {error ? 
            <p className={styles.error}>Stara šifra nije tačna.</p>
            :
            <></>  
          }
          {success ?
            <p className={styles.success}>Šifra uspešno promenjena!</p>
            :
            <></>
          }
        </form>
        <button id={styles.red} onClick={(e) => {
          odjava();
        }}>Odjavi se</button>
      </div>
    </div>
  )
}

export default Account;