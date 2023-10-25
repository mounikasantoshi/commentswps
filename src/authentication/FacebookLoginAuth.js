import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { useParams } from 'react-router-dom/dist';

function FacebookLoginAuth({closemodel}) {
    const params = useParams();
console.log(params);
    const handleEmailSubmit = async (email) => {
        try {
          const response = await fetch(`https://devblogsarchiv.wpengine.com/${params.blog_name}/wp-json/custom-user-handler/v1/user-loginchecks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          console.log("Facebook user data", data);
          if (data.exists||data.success) {
          sessionStorage.setItem('email',email);
          sessionStorage.setItem('user_details', [JSON.stringify(data.user_details)]);
          closemodel()          
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };


  return (
    <div className='margin'>
    <FacebookLogin
    size='medium'
    appId='1100113920963686'
    autoLoad={false}
    fields='name,email,picture'
    callback={(response)=>{
        sessionStorage.setItem('loginType','Facebook');
        handleEmailSubmit(response.email)
    }}
    />
    </div>
  )
}
export default FacebookLoginAuth