import React from 'react'
import { route } from 'navi'
import { withKeycloak } from '@react-keycloak/web'
import './Login.css'

const LoginPage = withKeycloak(({ keycloak }) => {
  return (
    
    <div class="body">
      <div class="signin"> 
      
        <div class="content"> 

          <h2>Keycloak Login</h2> 

          <div class="form"> 

            <div class="inputBox"> 

              <input type="submit" value="Login" onClick={() => keycloak.login()}/> 

            </div> 

          </div> 

        </div> 

      </div> 
   </div>
  )
})

export default route({
  title: 'Login',
  view: <LoginPage />,
})
