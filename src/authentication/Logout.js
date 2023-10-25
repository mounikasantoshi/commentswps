import React from 'react'

function Logout({onClick,closemodel}) {
    const logtype=sessionStorage.getItem('loginType')
    const tenantId=sessionStorage.getItem('tenantId')

    const glog=()=>{
            document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000";
    };
    const handleMicrosoftLogout = () => {
      const redirectUri = encodeURIComponent("https://login.microsoftonline.com/logout.srf");
      const logoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${redirectUri}`;
      window.location.href = logoutUrl;
      // document.location.href = logoutUrl;
        };

  return (
    <>
    <button onClick={()=>{
      //  logtype==='Facebook'&& facebookLogout()
       logtype==='Facebook'&& window.FB.logout()
       logtype==='Google'&&glog()
       logtype==='Microsoft'&&handleMicrosoftLogout()
        onClick()
        closemodel()
        sessionStorage.clear();
    }} className='button btnSmall'>Logout</button>
    </>
  )
}

export default Logout