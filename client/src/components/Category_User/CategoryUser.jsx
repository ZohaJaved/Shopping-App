// import React, { useEffect, useState } from 'react'
// import "./CategoryUser.css"
// import axios from 'axios';
// import ProductContext from '../Context/ProductContext';
// import { useContext } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItemsToDisplay } from '../../state/features/productSlicer';
// import { isEqual } from 'lodash';
// import { v4 as uuidv4 } from "uuid";

//  function CategoryUser(props) {
//   const navigate=useNavigate();
//   const [categories,setCategories]=useState([]);
//   const {catName,setCatName,getProductsByProductsType}=useContext(ProductContext);
//   const [catToFetchProd,setCatToFetchProd]=useState();
//   const [selectedCatName, setSelectedCatName] = useState(''); // State for selected category name
//   const dispatch=useDispatch();


//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/category/getCategories');
//         // console.log("response", response);
//         setCategories(response.data.categories);
//         // console.log("response.data",response.data.categories)
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getCategories();
//   }, []); 
    
//   const handleCategoryClick=(categoryName)=>{
//     if(categoryName){
//     const arg={category:categoryName}
//     dispatch(fetchItemsToDisplay(arg))
//   }
//   navigate('/ProductUserDisplay')
// }
// console.log("categories",categories)
//   return (
//     <div className='category' style={{width:'100%'}}>
       
//     <div className="category-container">
//           {categories.map((category) => (
//             <div key={uuidv4()} className='cat-item'  onClick={() => handleCategoryClick(category.categoryName)}>
//             {/* <li key={key} className={selectedCatName === category.categoryName ? 'active' : ''}> Add active class for visual indication */}
//                 <div className="image"  style={{ border:'1px solid none' ,borderRadius:'25px'}}>
//                   <img  src={category.cat_image} alt={category.categoryName} />
//                 </div>
//                 <div className="name" >
//                   {category.categoryName}
//                 </div>
//             </div>
//           ))}
//     </div>
    
//     </div>
//   );
// }
// export default CategoryUser;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchItemsToDisplay } from '../../state/features/productSlicer';
import { v4 as uuidv4 } from "uuid";
import ProductContext from '../../Context/ProductContext';
import "./CategoryUser.css";

function CategoryUser(props) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { catName, setCatName, getProductsByProductsType } = useContext(ProductContext);
  const [catToFetchProd, setCatToFetchProd] = useState();
  const [selectedCatName, setSelectedCatName] = useState(''); // State for selected category name
  const [isReady, setIsReady] = useState(false); // Add isReady state
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/getCategories');
        setCategories(response.data.categories);
        setIsReady(true); // Set isReady to true once data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []); 
    
  const handleCategoryClick = (categoryName) => {
    if (categoryName) {
      const arg = { category: categoryName };
      dispatch(fetchItemsToDisplay(arg));
    }
    navigate('/ProductUserDisplay');
  }

  if (!isReady) {
    return (
      // <div className="loading-container" style={{height:'200px',width:'100%',margin:'7px 0'}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <img src="/Imgs/loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className='category' style={{ width: '100%' }}>
      <div className="category-container">
        {categories.map((category) => (
          <div key={uuidv4()} className='cat-item' onClick={() => handleCategoryClick(category.categoryName)}>
            <div className="image" style={{ border: '1px solid none', borderRadius: '25px' }}>
              <img src={category.cat_image} alt={category.categoryName} />
            </div>
            <div className="name">
              {category.categoryName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryUser;
