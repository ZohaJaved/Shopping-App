import React, { useContext, useState } from 'react';
import './Navbars.css';
import logo from '../img/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import LoginContext from "../../Context/LoginContext";
import { useAuth } from '../../auth';
import { FaSearch } from "react-icons/fa";

function Navbars(props) {
  const navigate = useNavigate();
  const userContext = useContext(LoginContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { destroySession } = useAuth();

  // Handle search input change
  const handleChange = (e) => {
    const { value } = e.target;
    // Ensure the length of the value is within the desired range
    if (value.length >= 0 && value.length <= 20) {
      setSearchTerm(value);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    if(searchTerm.length>0){
    userContext.setSearchTerm(searchTerm);
    navigate('/searchItems');
    }
  };

  return (
    <div className='header' style={{width:'100%',height:'100px',display:'flex',justifyContent:'space-between',gap:'50px'}}>
      <div className="headerLeft" style={{display:'flex',justifyItems:'flex-start',alignItems:'center',marginLeft:'0'}}>
        <div className='logo-name'>
          <img src={logo} alt='company logo' style={{ width:'3rem',height:'auto', padding: '5px', borderRadius: '50%' }} />
          <span style={{ marginLeft: '0' }}>Kabeer Fashion</span>
        </div>
        {props.showSearchbar && (
          <div className="input-group">
            <div className="form-outline">
              <input type="search" id="form1" className="form-control" onChange={handleChange} value={searchTerm} placeholder='search' />
              <button className='search-icon' onClick={handleSearch}>
                <FaSearch style={{ color: 'black' }} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="headerRight">
        <div className="menu">
          <ul style={{display:'flex',justifyContent:'end',padding:'20px'}}>
            {props.navElements && props.navElements.map((element, index) => {
              if (element.elementName === 'Log Out') {
                return (
                  <li className='nav-element' key={index} onClick={() => destroySession()}>
                    <div className='nav-icon'>
                      <img src={element.elementIcon}  />
                    </div>
                    <div className='nav-name'>{element.elementName}</div>
                  </li>
                );
              } else {
                return (
                  <li className='nav-element' key={index} onClick={() => navigate('/' + element.elementName)}>
                    <div className='nav-icon'>
                      <img src={element.elementIcon}  />
                    </div>
                    <div className='nav-name'>{element.elementName}</div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbars;
