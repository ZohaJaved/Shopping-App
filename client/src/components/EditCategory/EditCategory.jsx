import React from 'react'
import CategoryContext from '../../Context/CategoryContext.js'
import { useContext,useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./EditCategory.css"
import Navbars from '../Navbar/Navbars.jsx';

export default function EditCategory(props) {
    
    const navElements=['Products','Orders','Account','Logout']
    const navigate=useNavigate();
    const [displayUpdateInfo,setDisplayUpdateInfo]=useState(false)
    const[image,setImage]=useState();
    const CatContext=useContext(CategoryContext);
    const {EditingCategory,setEditingCategory}=CatContext;
    const [updateValue,setUpdatevalue]=useState();
    console.log("editingCategory",CatContext.EditingCategory);
    
    
    useEffect(() => {
      if (updateValue) {
          try {
              const id = EditingCategory._id;
              axios.put(`http://localhost:3001/category/updateCategory/${id}`, updateValue)
                   .then(response => {
                   console.log("updated successfully");
                    // Update EditingCategory with new image data
                    setEditingCategory(updateValue); 
                    setDisplayUpdateInfo(true)
                    })
                   
          } catch (error) {
              console.error(error);
          }
      }
  }, [updateValue]);
    function handleInputChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
        setEditingCategory(prevCategory => {return{ ...prevCategory, [name]: value }});
        
    }

    const handlePhoto = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log("file", file);
      
        const reader = new FileReader(); // Create the FileReader first
      
        reader.onload = function(event) {
          console.log("prevValue",event.target.result)
          setImage(event.target.result)
        
        };
        
      
        reader.readAsDataURL(file); // Read the file directly as a data URL
      };
       
      async function updateClick(event) {
        event.preventDefault();
        if (!EditingCategory || !EditingCategory.categoryName || EditingCategory.categoryName.trim() === '') {
            alert("Please enter all the fields");
            return;
        }

        let updatedValue = EditingCategory;
        if (image) {
            updatedValue = { ...updatedValue, cat_image: image };
        }
        setUpdatevalue(updatedValue);
    }

  return (
    <center>
      <Navbars  navElements={navElements} />
    <div className='edit-category'>
        <h2>Edit Category</h2>
        <table>
        <tr>
         <th >Name</th>
         <td>
        <input 
         style={{width:"350px"}}
        className="input"
          name="categoryName"
          value={EditingCategory.categoryName}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Old pic</th>
         <td>
         <img style={{ height: '10rem', width: 'auto' }} src={EditingCategory.cat_image}/>
      </td>
         </tr>
         <tr>
         <th >New pic</th>
         <td>
         <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handlePhoto}
            />
      </td>
         </tr>
         <button className="button" onClick={updateClick} >Update</button>
         
        <button onClick={()=>navigate('/category')} className="button">Cancel</button>
        </table>
        {displayUpdateInfo&&<span>updated successfully</span>}
      </div>
      </center>
  )
}
