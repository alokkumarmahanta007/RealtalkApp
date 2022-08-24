import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink,Link,useNavigate,useLocation } from 'react-router-dom'
import { logout } from '../../actions'
import './style.css'

export const Layout = (props) => {
  const getParams=useLocation();
  console.log(getParams.pathname)
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logouta=()=>{
dispatch(logout(auth.uid))
return navigate("/login")
    }
   
    console.log(auth)
  return (
    <div className='layout_wrapper'>
    <div className='nav_wrapper'>
    <span>REAL TALK</span>
    <div className='header_wrapper'>
   {!auth.authenticated?<p style={{marginRight:'20px'}}><Link to={'/login'}>Login</Link></p>:''} 
   {!auth.authenticated? <p><Link to={'/signup'}>Signup</Link></p>:''}
   <p style={{marginRight:'20px'}}>{auth.authenticated?`Hello ${auth.firstName}`:''}</p>
   {auth.authenticated?<p style={{cursor:'pointer'}} onClick={logouta}>Logout</p>:null}

    
</div>
<div></div>
    </div>
    {getParams.pathname !=='/login' &&getParams.pathname!=='/signup' &&!auth.authenticated?<div className='instruction'>
    <h4>WELCOME TO REAL TALK</h4>
<p className=''>Please <Link to={'/signup'}>Signup</Link> to start conversation</p>
<p>Already an user ? Please <Link to={'/login'}>Login</Link></p>
    </div>:''}
    
    {props.children}</div>
  )
}
