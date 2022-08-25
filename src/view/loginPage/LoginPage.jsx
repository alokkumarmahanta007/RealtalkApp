import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layout/Layout';
import { isLoggedIn, signin } from '../../actions';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
const LoginPage = () => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const [displayerrorEmail, setErrorStatusEmai] = useState(false)
    const [disableButton, setButtonStatus] = useState(true)
    const [password, setPassword] = useState('')
    const [loader, setLoaderStatus] = useState(false)
    const dispatch = useDispatch()
    const login = (e) => {
        e.preventDefault()
        dispatch(signin({
            email, password
        }))
    }
    useEffect(() => {
        if (auth.authenticated) {
            return navigate("/")
        }
        if (!auth.authenticated) {
            dispatch(isLoggedIn())
        }

    }, [auth.authenticated, dispatch, navigate])

    useEffect(() => {
        if (auth.authenticating) {
            setLoaderStatus(true)
        } else {
            setLoaderStatus(false)
        }
    }, [auth.authenticating])
    useEffect(() => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email === '' || password === '' || !email || regex.test(email) === false || password.length < 6) {
            setButtonStatus(true)
        } else {
            setButtonStatus(false)
        } if ((!email || regex.test(email) === false) && email !== '') {
            setErrorStatusEmai(true)
        } else {
            setErrorStatusEmai(false)
        }
    }, [email, password])
    return (
        <Layout>
            <div >
                {auth.error !== 'Login again' ? <p className='auth_error_text'> Email id or password is wrong . Please re enter and try again </p> : ''}

                <div className='login_wrapper'>
                    <form onSubmit={login}>

                        <p>Email <span style={{ color: 'red' }}>*</span></p>
                        <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br />
                        {displayerrorEmail ? <span style={{ fontSize: '12px', color: 'red' }}>Email is not valid</span> : ''}
                        <br />
                        <p>Password <span style={{ color: 'red' }}>*</span></p>
                        <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                        {password.length < 6 && password !== '' ? <span style={{ fontSize: '12px', color: 'red' }}>Password must 6 characters or long</span> : ''}
                        <div><button style={{ background: disableButton ? 'gray' : '', pointerEvents: disableButton ? 'none' : '' }} type='submit'>Login</button></div>
                    </form>
                </div>

            </div>
        </Layout>

    )
}
export default LoginPage;
