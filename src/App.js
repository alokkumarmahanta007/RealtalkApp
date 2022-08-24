import logo from './logo.svg';
import './App.css';
import React,{useEffect,} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './view/homePage/Home.jsx'
import LoginPage from './view/loginPage/LoginPage';
import Register from './view/registerPage/Register';

import { isLoggedIn } from './actions';
function App() {
  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch();
  useEffect(()=>{
if(!auth.authenticated){
  dispatch(isLoggedIn())
}
  },[auth.authenticated, dispatch])
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={<Home/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<Register/>}/>
   </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
