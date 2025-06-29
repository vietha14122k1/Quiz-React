import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import { Outlet, Link } from "react-router-dom";
import React from 'react';
import Header from './components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-conatiner'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}


export default App;
