import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../actions'
import clos_icon from '../../assets/close.png'
import avtar from '../../assets/avatar.png'
import camera_icon from '../../assets/camera.png'
import { storage ,db} from '../../firebase'
import {getDoc,doc,updateDoc} from 'firebase/firestore'
import {ref,uploadBytes, getDownloadURL} from 'firebase/storage'

import './style.css'

export const Layout = (props) => {
  const [imgUrl,setImgUrl]=useState('')
  const [user,setUser]=useState('')
  const getParams = useLocation();
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [drawerStatus,setDrawerStatus]=useState(false)

  const logouta = () => {
    dispatch(logout(auth.uid))
    return navigate("/login")
  }
const showDrawer=()=>{
  setDrawerStatus(true)
}
const closeDrawer=()=>{
  setDrawerStatus(false)
}
useEffect(()=>{
  if(auth.uid){
    getDoc(doc(db,'newusers',auth.uid)).then(docSnap=>{
      if(docSnap.exists){
  setUser(docSnap.data())
      }
    })
  
  }
 
if(imgUrl){
  const uploadImg=async()=>{
const imgRef=ref(storage,`avatar/${new Date().getTime()}-${imgUrl.name}`)
try{
  const snap= await uploadBytes(imgRef,imgUrl)
  const url=await getDownloadURL(ref(storage,snap.ref.fullPath))
  await updateDoc(doc(db,'newusers',auth.uid),{
    avtar:url,
    avatarPath:snap.ref.fullPath
  })
  setImgUrl('')
}catch(err){
}
  }
  uploadImg()
}
},[auth.uid, imgUrl])
  return (
    <div className='layout_wrapper'>
    {drawerStatus?<div className='drawer'>
    <img alt='close drawer' className='img_close' onClick={closeDrawer} src={clos_icon}  />
    <div className='drawer_content'>
    <img className='avtar_upload' onClick={showDrawer} style={{  height: '100px', marginTop: '75px' }} alt='avatar' src={user.avtar?user.avtar:avtar} />
    <div>Upload profile picture <div class="image-upload">
    <label for="file-input">
        <img alt='upload file' src={camera_icon}/>
    </label>

    <input onChange={(e)=>setImgUrl(e.target.files[0])} id="file-input" type="file"/>
</div></div>
    </div>
    
    </div>:''}
    
      <div className='nav_wrapper'>
        <span>REAL TALK</span>
        <div className='header_wrapper'>
          {!auth.authenticated ? <p style={{ marginRight: '20px' }}><Link to={'/login'}>Login</Link></p> : ''}
          {!auth.authenticated ? <p><Link to={'/signup'}>Signup</Link></p> : ''}
          <p style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>{auth.authenticated ? `Hello ${auth.firstName}` : ''}{auth.authenticated ?<img onClick={showDrawer} style={{ cursor: 'pointer', height: '30px', marginLeft: '5px' }} alt='avatar' src={user.avtar?user.avtar:avtar} />:'' }</p>
          {auth.authenticated ? <p style={{ cursor: 'pointer' }} onClick={logouta}>Logout</p> : null}


        </div>
        <div></div>
      </div>
      {getParams.pathname !== '/login' && getParams.pathname !== '/signup' && !auth.authenticated ? <div className='instruction'>
        <h4>WELCOME TO REAL TALK</h4>
        <p className=''>Please <Link to={'/signup'}>Signup</Link> to start conversation</p>
        <p>Already an user ? Please <Link to={'/login'}>Login</Link></p>
      </div> : ''}

      {props.children}</div>
  )
}
