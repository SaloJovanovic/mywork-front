import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Raspored from "./components/Raspored/Raspored";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import setCookie from "./components/Cookies/setCookie";
import getCookie from "./components/Cookies/getCookie";
import link from "./components/BackLink";
import MonthlyReport from "./components/MonthlyReport/MonthlyReport";
import OneSignal from 'react-onesignal';


function App() {

  const[access, setAccess] = useState(true);

  const getToken = async () => {
    const resp = await fetch(`${link}/account/get-token?id=${getCookie('id')}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then((response) => response.text());
    console.log(resp);
    if (resp === getCookie('token'))
      setAccess(true);
    else
      setAccess(false);
  }

  useEffect(() => {
    getToken();
    OneSignal.init({
      appId: "926b5dda-2e94-4380-aad6-6cb84cf88a64"
    });
  }, []);

  return (
    <BrowserRouter>
      <div className='Body'>
        { access ?
        <Navbar></Navbar>
        :
        <></>
        }
        <div className='holder'>
          <Routes>
            <Route path='/' element={
              <div>
                { access ?
                <Main></Main>
                :
                <Login></Login>
                }
              </div>
            }></Route>
            { access ?
            <>
            <Route path={'/raspored'} element={
              <div>
                <Raspored/>
              </div>
            }></Route>
            <Route path={'/nalog'} element={
              <div>
                <Account/>
              </div>
            }></Route>
            <Route path={'/mesecni-izvestaj'} element={
              <div>
                <MonthlyReport/>
              </div>
            }></Route>
            </>
            :
            <>
            </>
            }
            <Route path={'/login'} element={
              <div>
                <Login/>
              </div>
            }></Route>
          </Routes>
        </div>
        {/* :
        <div className={"loggedout"}>
          You are logged out.
          <a className={"loginbutton"} href='/login'>LOGIN</a>
        </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;