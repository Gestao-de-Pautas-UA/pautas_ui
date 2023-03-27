import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import logo from './logo.png';


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
  
        <div className="topLeft">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="logo">paco</span>
        </div>
       
        {/* <div className="topRight">
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div> */}
      </div>
    </div>
  );
}