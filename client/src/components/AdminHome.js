import React from 'react'
import './Category_admin/category.jsx'
import Navbars from './Navbar/Navbars.jsx';
import SideNav from './SideNav';
import AdminNavbar from './Navbar/AdminNavbar.jsx';


function AdminHome(){
    
    return(<div className='admin' >
        <AdminNavbar   displayToggle={true}/>
        <SideNav  />        
    </div>)
}
export default AdminHome;