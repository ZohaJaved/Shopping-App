// import React from 'react';
// import { useState,useEffect } from 'react';
// import Navbars from '../Navbar/Navbars.jsx'
// import CategoryUser from '../Category_User/CategoryUser.jsx'
// import ProdByType from '../ProdByType/ProdByType.jsx'
// import Footer from '../Footer/Footer.jsx'
// import Slider from '../Slider/Slider.js';
// import cartIcon from "../../navIcons/cart.svg"
// import logoutIcon from "../../navIcons/logout.svg"
// import orderIcon from "../../navIcons/orderIcon.svg"
// import AccountIcon from "../../navIcons/person.svg"
// import "./User.css"


// const User = React.memo(() => {

//   const [isReady, setIsReady] = useState(false);
//   const navElements=[{elementName:'Account',elementIcon:AccountIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsReady(true);
//     }, 1000); 

//     return () => clearTimeout(timer); // Cleanup the timer on component unmount
//   }, []);

//   if (!isReady) {
//     return <><Navbars navElements={navElements} showSearchbar={true}/> <div className="loading-container">Loading...</div></>
//   }  

//   return (
//     <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
//       {/* <div> */}
//       <Navbars navElements={navElements} showSearchbar={true}/>
//       {/* </div> */}
//       <CategoryUser  />
//       <Slider/>
//       <hr style={{margin:'1px',color:'white'}}/>
//       <ProdByType productType="FestWear" heading='FestWear'/>
//       <hr style={{margin:'1px',color:'white'}}/>
//       <ProdByType productType="Ethnic Wear" heading='Ethnic Wear'/>
//       <hr style={{margin:'1px',color:'white'}}/>
//       <ProdByType productType="Footwear" heading='Footwears'/>
//       <Footer/>
//     </div>
//   )
// })
// export default User;

import React, { useState, useEffect } from 'react';
import Navbars from '../Navbar/Navbars.jsx';
import CategoryUser from '../Category_User/CategoryUser.jsx';
import ProdByType from '../ProdByType/ProdByType.jsx';
import Footer from '../Footer/Footer.jsx';
import Slider from '../Slider/Slider.js';
import cartIcon from "../../navIcons/cart.svg";
import logoutIcon from "../../navIcons/logout.svg";
import orderIcon from "../../navIcons/orderIcon.svg";
import AccountIcon from "../../navIcons/person.svg";
// import loadingGif from '../../../public/Imgs/Loader.gif'
import "./User.css";
import LoginContext from "../../Context/LoginContext.js";
import { useContext } from 'react';


const User = React.memo(() => {
  const userContext = useContext(LoginContext);

  let {userDetails} = userContext;
  console.log("userDetails in AppContent",userDetails)
  const [isReady, setIsReady] = useState(false);
  const navElements = [
    { elementName: 'Account', elementIcon: AccountIcon },
    { elementName: 'Cart', elementIcon: cartIcon },
    { elementName: 'Orders', elementIcon: orderIcon },
    { elementName: 'Log Out', elementIcon: logoutIcon },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!isReady) {
    return (
      <>
        <Navbars navElements={navElements} showSearchbar={true} />
        <div className="loading-container">
          <img src="/Imgs/Loader.gif" style={{height:'40px',width:'40px'}} alt="Loading..." />
        </div>
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Navbars navElements={navElements} showSearchbar={true} />
      <CategoryUser />
      <Slider />
      {/* <div style={{display:'flex',flexDirection:'column',height:'100vh',width:'100%'}}> */}
      <hr style={{ margin: '1px', color: 'white' }} />
      <ProdByType productType="FestWear" heading='FestWear' />
      <hr style={{ margin: '1px', color: 'white' }} />
      <ProdByType productType="Ethnic Wear" heading='Ethnic Wear' />
      <hr style={{ margin: '1px', color: 'white' }} />
      <ProdByType productType="Footwear" heading='Footwears' />
      {/* </div> */}
      <Footer />
    </div>
  );
});

export default User;
