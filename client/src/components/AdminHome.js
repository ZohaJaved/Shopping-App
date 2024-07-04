import React from 'react'
import './category.css'
import Navbars from './Navbars';
import SideNav from './SideNav';


function AdminHome(){
    const navElements=['Notification','Account','Logout']
    return(<div className='admin' >
        <Navbars  navElements={navElements} displayToggle={true}/>
        <SideNav  />        
    </div>)
}
export default AdminHome;