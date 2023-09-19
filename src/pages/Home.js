import React, { useCallback } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import { useAxios } from '../utils/hooks'
import { redirect } from 'navi'
import {useEffect} from 'react'
import './Login.css'

//import {express} from 'express'
//import {cors} from cors

//const app = express()

// app.get('/',(req,res)=>
// {
//   res.send('Welcome to cors')
// })

export default () => {

  function logout(){
    console.log("inside logout");
   //\ keycloak.logout();
   //keycloak.logout();
    window.location.replace("http://localhost:8080/realms/test/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:3000/home&client_id=dummyclient");
  }

  function callApiAdmin(){
    let url = `/admin`;

  return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }}).then((response) => {
    console.log(response.data);
    alert(response.data.msg);
    return response.data;
  });
}

function callApiManager(){
  let url = `/manager`;

 try{
  return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }})
.then((response) => {
  // if(response==error){
  //   console.log(response.data);
  // }
  console.log(response.data);
  alert(response.data.msg);
  return response.data;
});
}
catch(error){
  console.log(error);
  alert(error.response.data);
}

}
  function callApiUser(){
    let url = `/user`;

  return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }}).then((response) => {
    console.log(response.data);
    alert(response.data.msg);
    return response.data;
  });

    console.log("inside callapi Bearer " +`${keycloak.token}`);
    // useEffect(() => {
    //   axios.get('http://localhost:8081/api/user',{
    //     headers:{
    //       Authorization: 'bearer'+keycloak.idToken,       
    //     }
    //   })
    //     .then(response => {
    //       //setPosts(response.data);
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });'Acess-Control-Allow-Origin' :"*"
    // }, []); { mode:'no-cors' }, 'Acess-Control-Allow-Origin' :'http://localhost:3000', withCredentials:true, Authorization: `Bearer ${keycloak.token}`,{headers:{'Acess-Control-Allow-Origin' :'*' }
    // fetch('http://localhost:8081/api/test/anonymous',{mode:'no-cors',credentials: "include",}  )
    // .then(data => data.json()) // Parsing the data into a JavaScript object
    // .then(json => alert(JSON.stringify(json)));
    //useAxios(('http://localhost:8081/api/test/user', {headers:{Authorization: `Bearer ${keycloak.token}`, })
    axios.get('anonymous', {
  headers: {
    //'Authorization': `Bearer ${keycloak.token}`,
   // 'Access-Control-Allow-Origin':'*',
    
  },
 // mode:'no-cors'
}).then((res) => {
  console.log(res.data)
})
    
  }

  const { keycloak } = useKeycloak()
  const axiosInstance = useAxios('http://localhost:5000') // see https://github.com/panz3r/jwt-checker-server for a quick implementation
  const callApi = useCallback(() => {
    axiosInstance.get('/jwt/decode')
  }, [axiosInstance])

  return (
    <div class="body">
      <div class="signin">
        <div class="content">
        <h2>User is {!keycloak.authenticated ? 'NOT ' : ''} authenticated</h2>
        

      {!!keycloak.authenticated && (
        //keycloak.logout()
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      )}

      <button class="links" type="button" onClick={() =>callApiUser()}>
        Call API User
      </button>

      <button type="button" onClick={() =>callApiAdmin()}>
        Call API Admin
      </button>

      <button type="button" onClick={() =>callApiManager()}>
        Call API Manager
      </button>
      </div>
      </div>
    </div>
  )
}
