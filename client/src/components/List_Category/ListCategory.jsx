import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CategoryContext from "../Context/CategoryContext"
import axios from "axios";
import styles from "../List_Category/ListCategory.module.css"

function ListCategory(props){
  const CatContext=useContext(CategoryContext);
  const navigate = useNavigate();
  console.log("CatContext",CatContext);
   
  const handleButtonClick = () => {
    console.log("handleButtonClicke",props.Cat_details)
    // Call setEditingCategory with the Cat_details value
    CatContext.setEditingCategory(props.Cat_details);
    // Navigate to "/edit-category" route
    navigate('/edit-category');
  };

  async function deleteCategory(id){
    console.log("delete category",id)
    //confirm before deleting
    const shouldDelete = window.confirm("Are you sure you want to delete this perticular category?");
      
        if (!shouldDelete) {
          return;
        }
    console.log("id",id)
    try{
      const response=await axios.post(`http://localhost:3001/category/delCategory/${id}`)
      if (response.status===200){
        console.log("category deletec from db",props.updateCategory())
        props.updateCategory();
      }
     }
     catch(error){
     console.error("error during deletion",error)
     }
    }
//     const stickies = document.querySelectorAll('[data-sticky = left]')
// const container = document.querySelector('.table-container')
// const containerLeft = container.getBoundingClientRect().left

// stickies.forEach(sticky => {
//   const left = sticky.getBoundingClientRect().left - containerLeft
//   sticky.setAttribute('style',`--_left:${left}px;`);
// });

return (
  <tr>
      <td >{props.id}</td>
      <td >{props.name}</td>
      <td><img src={props.pic} style={{ height: '30px', width: '30px' }} /></td>
      <td><button onClick={()=>handleButtonClick(props._id)}>Edit Category</button></td>
      <td>
  <button onClick={()=>deleteCategory(props._id)}>DELETE</button>
</td>
  </tr>
)}
export default ListCategory;