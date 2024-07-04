import React, { useEffect, useState } from 'react'
import "./CategoryUser.css"
import axios from 'axios';
import ProductContext from '../Context/ProductContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsToDisplay } from '../../state/features/productSlicer';
import { isEqual } from 'lodash';

 function CategoryUser(props) {
  const navigate=useNavigate();
  const [categories,setCategories]=useState([]);
  const {catName,setCatName,getProductsByProductsType}=useContext(ProductContext);
  const [catToFetchProd,setCatToFetchProd]=useState();
  const [selectedCatName, setSelectedCatName] = useState(''); // State for selected category name
  const dispatch=useDispatch();


  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/getCategories');
        // console.log("response", response);
        setCategories(response.data.categories);
        // console.log("response.data",response.data.categories)
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []); 
    
  const handleCategoryClick=(categoryName)=>{
    if(categoryName){
    const arg={category:categoryName}
    dispatch(fetchItemsToDisplay(arg))
  }
  navigate('/ProductUserDisplay')
}
  return (
    <div className='nav'>
    <div className="nav-category">
      <nav>
        <ul>
          {categories.map((category, key) => (
            <li key={key} className={selectedCatName === category.categoryName ? 'active' : ''}> {/* Add active class for visual indication */}
              <a
                onClick={() => handleCategoryClick(category.categoryName)}
              >
                <div className="image">
                  <img style={{height:'70%', width:'75%'}} src={category.cat_image} alt={category.categoryName} />
                </div>
                <div className="name">
                  <span>{category.categoryName}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </div>
  );
}
export default CategoryUser;
