import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layout/Layout'
import { signup } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './style.css'
const Register = () => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disableButton,setButtonStatus]=useState(true)
    const dispatch = useDispatch()
    const [displayerrorEmail,setErrorStatusEmai]=useState(false)
    const [submitStatus,setSubmitStatus]=useState(false)

    const registerUser = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        console.log(user)
        dispatch(signup(user)).then((res)=>{
            setSubmitStatus(true)
        })
    }
    console.log(displayerrorEmail)
    useEffect(() => {
        if (auth.authenticated) {
            return navigate("/")
        }
    }, [auth.authenticated, navigate])
    useEffect(()=>{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email===''||firstName===''||lastName===''||password===''||!email || regex.test(email) === false|| password.length<6){
            setButtonStatus(true)
        }else{
            setButtonStatus(false)
        }if((!email || regex.test(email) === false) && email!==''){
            setErrorStatusEmai(true)
        }else{
            setErrorStatusEmai(false)
        }
    },[email, firstName, lastName, password])
    return (
        <Layout>
            <div >
           
            <div className='register_wrapper'>
            <form onSubmit={registerUser}>
                    <div className='form_inner_content'>
                  
                        <div>
                            <p>First name <span style={{color:'red'}}>*</span></p>
                            <input type='text' value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                            <p>Email <span style={{color:'red'}}>*</span></p>
                            <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br/>
                            {displayerrorEmail?<span style={{fontSize:'12px',color:'red'}}>Email is not valid</span>:''}
                            {auth.error!=='Login again'&& submitStatus?<span style={{fontSize:'12px',color:'red'}}>Email id already registered</span>:''}
                        </div>
                        <div>
                            <p>Last name <span style={{color:'red'}}>*</span></p>
                            <input type='text' value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />

                            <p>Password <span style={{color:'red'}}>*</span></p>
                            <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br/>
                            {password.length<6 && password !==''?<span style={{fontSize:'12px',color:'red'}}>Password must 6 characters or long</span>:''}
                        </div>
                    </div>

                    <button style={{background:disableButton?'gray':'',pointerEvents:disableButton?'none':''}} type='submit'>Sign up</button>
                </form>
            </div>
                
            </div>
        </Layout>

    )
}
export default Register
