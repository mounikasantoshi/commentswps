import React, { useEffect, useState } from 'react'
import FacebookLoginAuth from './FacebookLoginAuth';
import GoogleLoginAuth from './GoogleLoginAuth';
import MicrosoftLoginAuth from './MicrosoftLoginAuth';
import Logout from './Logout';
import "../App.css";

function Login(props) {

  const [isLogin,setIsLogin]=useState(false)
  
  useEffect(()=>{
    sessionStorage.getItem('email')!==null&&setIsLogin(!isLogin)
  },[sessionStorage.getItem('email')])

  const closemodel=()=>{
    setIsLogin(false)
  }

  console.log('isLogin', isLogin);

  //useEffect(()=>{
    props.handleCallback(isLogin);
  //}, [isLogin]);

  return (
    <div>
      {!isLogin&&<><button onClick={()=>{
        setIsLogin(true)
      }} className='button btnSmall'>Log in</button>
      
      </>
      }
      {isLogin&&(sessionStorage.getItem('email')==null?
      <>
        <div className="modal-overlay">
          <div className="modal">
          <span className="close-btn" onClick={()=>{
            setIsLogin(false)
          }}>
              &times;
            </span>
      <FacebookLoginAuth closemodel={closemodel}/><GoogleLoginAuth  closemodel={closemodel}/><MicrosoftLoginAuth  closemodel={closemodel}/>
          </div>
        </div>
      </>:
       <>
      <Logout closemodel={closemodel} onClick={()=>{setIsLogin(false)}}/>
      <h1>Welcome {sessionStorage.getItem('email')}</h1>
      {/* <Comments/> */}
      </> 
      )}
    </div>
  )
}
export default Login;