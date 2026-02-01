import React, {useState} from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import '../Sections/Navbar.css';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaRegUserCircle } from 'react-icons/fa';

function RightMenu(props) {
    const user = useSelector(state => state.user)
    const name = localStorage.getItem("name");

    const logoutHandler = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu className="rightbtnLogout" mode={props.mode}>
          <Menu.Item key="">
              <a className="rightbtn" href="/login">SignIn</a>
          </Menu.Item>
      </Menu>
    )
  } else if(user.userData && user.userData.isAdmin){
    return (
      <Menu className="rightSideUser" mode={props.mode}>
          <Menu.Item style={{marginRight:'10px'}}  key="logout">
              <h2>{name}</h2>
          </Menu.Item>
        <Menu.Item className="rightbtnReg" key="history">
          <a href="/register">Register User</a>
        </Menu.Item>

        <Menu.Item className="rightbtn" key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  } else{
      return (
          <Menu className="rightSideUser" mode={props.mode}>

              <Menu.Item style={{marginBottom:'20px'}}  key="logout">
                  <h2>{name}</h2>
              </Menu.Item>
              <Menu.Item key="cart">
                  <a href="/user">
                      <FaRegUserCircle style={{fontSize: 35,color:'#ff9800'}} />
                  </a>
              </Menu.Item>
              <Menu.Item  key="logout">
                  <a className="rightbtn" onClick={logoutHandler}>Logout</a>
              </Menu.Item>


          </Menu>
      )
  }
}

export default withRouter(RightMenu);
