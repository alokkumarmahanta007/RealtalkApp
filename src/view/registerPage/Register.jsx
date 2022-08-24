import React,{useState,useEffect} from 'react'
import { Layout } from '../../components/layout/Layout'
import {signup} from '../../actions'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './style.css'
 const Register = () => {
    const navigate=useNavigate()
    const auth=useSelector(state=>state.auth)
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()

    const registerUser=(e)=>{
        e.preventDefault()
        const user={
            firstName,lastName,email,password
        }
        console.log(user)
        dispatch(signup(user))
    }
    useEffect(()=>{
        if(auth.authenticated){
            return navigate("/")
        }
    },[auth.authenticated, navigate])
  return (
    <Layout>
         <div className='register_wrapper'>
         <form onSubmit={registerUser}>
         <div className='form_inner_content'>
         <div>
         <p>First name</p>
         <input type='text' value={firstName} placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)}/>
         <p>Email</p>
        <input type='text' value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
         </div>
        <div>
        <p>Last name</p>
            <input type='text' value={lastName} placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)}/>
       
        <p>Password</p>
            <input type='password' value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
         </div>
         
            <button type='submit'>Sign up</button>
         </form>
         </div>
    </Layout>
   
  )
}
export default Register
