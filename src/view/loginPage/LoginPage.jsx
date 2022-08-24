import React,{useState,useEffect} from 'react'
import { Layout } from '../../components/layout/Layout';
import { isLoggedIn, signin } from '../../actions';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
 const LoginPage = () => {
    const navigate=useNavigate()
const auth=useSelector(state=>state.auth)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const login=(e)=>{
e.preventDefault()
dispatch(signin({
    email,password
}))
    }
    useEffect(()=>{
        if(auth.authenticated){
            return navigate("/")
        }
        if(!auth.authenticated){
            dispatch(isLoggedIn())
        }
    },[auth.authenticated, dispatch, navigate])
  return (
    <Layout>
        <div className='login_wrapper'>
        <form onSubmit={login}>
       <p>Email</p>
            <input type='text' value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
           <p>Password</p>
            <input type='password' value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <div><button type='submit'>Login</button></div>
        </form>
        </div>
    </Layout>
    
  )
}
export default LoginPage;
