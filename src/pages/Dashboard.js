import React, { useState,useCallback } from 'react';
import './Dashboard.css';
import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'

document.body.style.backgroundColor="black";
const Dashboard = () => {
  
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
  const [keycloak, initialized] = useKeycloak()
  const [user,setUser] = useState(false);
  keycloak.loadUserInfo().then(value=>{console.log(setUser(value.name))})


  const toggleUserDropdown = () => {
    setUserDropdownVisible(!isUserDropdownVisible);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    window.location.replace("http://localhost:8080/realms/test/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:3000/dashboard&client_id=dummyclient");
  };

  const callApiUser = ()=>{
    let url = `/user`;
    return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }}).then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        return response.data;
    });
  };
  
  const callApiManager = ()=>{
    let url = `/manager`;

    return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }}).then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        return response.data;
    });
  };

  const callApiAdmin = ()=>{
    let url = `/admin`;

    return axios.get(url,{headers:{Authorization: `Bearer ${keycloak.token}`, }}).then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        return response.data;
    });
  };

  return (
    <div className="dashboard">
      <div className="menu-bar">
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Reports</div>
        <div className="menu-item">Settings</div>
        <div className="menu-item user-icon" onClick={toggleUserDropdown}>
          <div className="user">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
          </div>
          
          {isUserDropdownVisible && (
            <div className="user-dropdown">
              
              <div className="user-info">
              {user}
              </div>
              <br/>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="content">
        <h1>Welcome to your Dashboard</h1>
        <button className="action-button" onClick={callApiUser}>User API Call</button>
        <button className="action-button" onClick={callApiManager}>Manager API Call</button>
        <button className="action-button" onClick={callApiAdmin}>Admin API Call</button>
      </div>
    </div>
  );
};

export default Dashboard;
