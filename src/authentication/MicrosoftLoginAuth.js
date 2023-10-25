import React from "react";
import MicrosoftLogin from "react-microsoft-login";

function MicrosoftLoginAuth({closemodel}) {

  const handleEmailSubmit = async (email,tenantId) => {
    console.log(email);
      try {
        const response = await fetch('https://devblogsarchiv.wpengine.com/wp-json/custom-user-handler/v1/user-loginchecks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.exists||data.success) {
        sessionStorage.setItem('email',email);
        sessionStorage.setItem('tenentid',tenantId);
        closemodel()
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const authHandler = (err, data,msal) => {
      sessionStorage.setItem('loginType','Microsoft');
      sessionStorage.setItem('msal',msal);
      data&&
      handleEmailSubmit(data.account.username,data.tenantId)
        console.log(err,'err',data);
      };
      
      return (
        <div>
            <MicrosoftLogin clientId={'e91ee851-a821-4e2d-b59e-55bba8acfd0d'} authCallback={authHandler} 
            />
        </div>
      );
}

export default MicrosoftLoginAuth