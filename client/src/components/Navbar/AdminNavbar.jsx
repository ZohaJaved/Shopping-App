import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SidebarContext from "../Context/SidebarContext";
import logo from "../img/logo.jpeg";
import toggleIcon from "./toggleIcon.svg";
import "./Navbars.css";

function AdminNavbar({ navElements }) {
  const navigate = useNavigate();
  const SideBarContext = useContext(SidebarContext);
  const { sidebar, setSidebar } = SideBarContext;

  // Function to toggle the sidebar
  const toggleSideBar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="header">
      <div
        className="headerLeftAdmin"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="logo-name">
          <img
            src={logo}
            alt="company logo"
            style={{ width: "3rem", borderRadius: "50%" }}
          />
          <span style={{ marginLeft: "0" }}>Kabeer Fashion</span>
          <img
            src={toggleIcon}
            alt="Toggle Sidebar"
            style={{
              width: "25px",
              marginLeft: "15px",
              cursor: "pointer",
              backgroundColor: sidebar ? "gray" : "transparent",
            }}
            onClick={toggleSideBar}
          />
        </div>
      </div>
      <div className="headerRight">
        <div className="menu">
          <ul>
            {navElements &&
              navElements.map((element, index) => (
                <li
                  className="nav-element"
                  key={index}
                  onClick={() => navigate("/" + element.elementName)}
                >
                  <div className="nav-name">{element.elementName}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
