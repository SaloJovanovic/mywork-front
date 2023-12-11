import React, {useState, useEffect} from 'react';
import styles from "./Login.module.scss";
import setCookie from "../Cookies/setCookie";
import getCookie from "../Cookies/getCookie";
import link from "../BackLink";

const Login = () => {

  const[error, setError] = useState(false);

  const[username, setUsername] = useState("");
  const[attemptedPassword, setAttemptedPassword] = useState("");

  const ulogujSe = async () => {
    const resp = await fetch(`${link}/account/login?username=${username}&attemptedPassword=${attemptedPassword}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then((response) => response.json());
      console.log(resp);
      if (resp.success) {
        setCookie("loggedIn", "true", 30);
        setCookie("id", resp.id, 30);
        setCookie("token", resp.token, 30);
        window.location.href = '/';
      }
      else {
        setError(true);
      }
  }

  return (
    <div className={styles.container}>
      <form>
        <input type="text" placeholder="Nadimak" onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="password" placeholder="Šifra" onChange={(e) => {
          setAttemptedPassword(e.target.value)
        }}/>
        <button onClick={(e) => {
          ulogujSe();
          e.preventDefault();
        }}>Uloguj se</button>
        <p className={error? styles.error + " " + styles.visible : styles.error}>Pogrešni podaci</p>
      </form>
    </div>
  )
}

export default Login;