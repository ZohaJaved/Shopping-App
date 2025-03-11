// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { festWear } from "./data";
// import "./ProdByType.css";
// import { useNavigate } from "react-router-dom";
// import ProductContext from "../Context/ProductContext";
// import LoginContext from "../Context/LoginContext";
// import { useDispatch, useSelector } from "react-redux";
// import { add_to_cart } from "../../state/features/cartSlicer";
// import { fetchItemsToDisplay } from "../../state/features/productSlicer";

// function ProdByType(props) {
//   const [productToDisplay, setProductToDisplay] = useState(); //list of 4 produts to display

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = (productDetails) => {
//     console.log("productDetails", productDetails);
//     dispatch(add_to_cart({ productDetails, quantityIncrement: 1 })); // Dispatch the action
//   };

//   //fetch the list of 4 produts from
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         axios
//           .get("http://localhost:3001/product/getProductsByProductType", {
//             //here ProductType is categoryName
//             params: {
//               tags: props.productType,
//             },
//           })
//           .then((response) => {
//             setProductToDisplay(response.data.fetched_doc.slice(0, 8));
//             console.log("productFetch", response.data.fetched_doc);
//           })
//           .catch((error) => console.error("Error fetching products", error));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         // Handle errors gracefully (e.g., display an error message)
//       }
//     };

//     fetchProducts();
//   }, [props.productType]);

//   return (
//     <section className="product-wrapper" style={{backgroundColor:'#FFFFFF'}}>
//       <hr style={{ border: "0", height: "0.5px", background: "black",width:'100%' }} />
//       <div className="productType" style={{backgroundColor:'#FFFFFF'}}>
//         <h2 className="heading" style={{ textAlign: "center", justifyContent: "center" ,color:'rgb(90 74 74)',fontSize:'48px',fontWeight:'400',textDecoration:'none'}}>
//           {props.heading}
//         </h2>
//       </div>
//       <div className="item-container" style={{backgroundColor:'#FFFFFF'}}>
//         {productToDisplay &&
//           productToDisplay.map((object) => {
//             console.log("productToDisplay", object);
//             return (
//               <div
//                 className="item"
//                 style={{backgroundColor:'#F6F6F6',border:'1px solid #E1E1E1',display:'flex',flexDirection:'column',gap:'5px',height:'75vh',backgroundColor:'#FFFFFF'}}
//                 onClick={() =>
//                   navigate("/productDetailsPage", { state: { object } })
//                 }
//               >
//                 <div className="item-img">
//                   <img
//                     src={object.productImages[0].original}
//                     alt={object.productName}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//                 <div className="product-title">
//                   <span style={{ height: "100%" ,padding:'5px' }}>{object.productName}</span>
//                 </div>
//                 <div className="product-price">
//                  <span >Price: ₹{object.discountedPrice}</span> 
//                 </div>
//                 {/* <button className='addToCart'  onClick={()=>{handleClick(object,1)}}>Add to cart</button> */}
//               </div>
//             );
//           })}
//       </div>
//       <button
//         // style={{ left: "-5%", backgroundColor: "#F7AEA6", color: "black" }}
//         className="view-all-button"
//         onClick={() => {
//           if (props.productType) {
//             const arg = { tags: props.productType };
//             {
//               dispatch(fetchItemsToDisplay(arg));
//             }
//             navigate("/ProductUserDisplay");
//           }
//         }}
//       >
//         View All
//       </button>
//     </section>
//   );
// }
// export default ProdByType;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { festWear } from "./data";
import "./ProdByType.css";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import LoginContext from "../../Context/LoginContext";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../state/features/cartSlicer";
import { fetchItemsToDisplay } from "../../state/features/productSlicer";
// import loadingGif from '../../path/to/loading.gif'; // Import the loading GIF

function ProdByType(props) {
  const [productToDisplay, setProductToDisplay] = useState(); // List of products to display
  const [isReady, setIsReady] = useState(false); // Add isReady state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (productDetails) => {
    console.log("productDetails", productDetails);
    dispatch(add_to_cart({ productDetails, quantityIncrement: 1 })); // Dispatch the action
  };

  // Fetch the list of products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product/getProductsByProductType", {
          // Here ProductType is categoryName
          params: {
            tags: props.productType,
          },
        });
        setProductToDisplay(response.data.fetched_doc.slice(0, 8));
        console.log("productFetch", response.data.fetched_doc);
        setIsReady(true); // Set isReady to true once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle errors gracefully (e.g., display an error message)
      }
    };

    fetchProducts();
  }, [props.productType]);

  if (!isReady) {
    return (
      <div className="loading-container" style={{height:'100vh',width:'100%'}}>
        <img src="/Imgs/loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <section className="product-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
      <hr style={{ border: "0", height: "0.5px", background: "black", width: '100%' }} />
      <div className="productType" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="heading" style={{ textAlign: "center", justifyContent: "center", color: 'rgb(90 74 74)', fontSize: '48px', fontWeight: '400', textDecoration: 'none' }}>
          {props.heading}
        </h2>
      </div>
      <div className="item-container" style={{ backgroundColor: '#FFFFFF' }}>
        {productToDisplay &&
          productToDisplay.map((object) => {
            console.log("productToDisplay", object);
            return (
              <div
                className="item"
                style={{ backgroundColor: '#F6F6F6', border: '1px solid #E1E1E1', display: 'flex', flexDirection: 'column', gap: '5px', height: '75vh' }}
                onClick={() => navigate("/productDetailsPage", { state: { object } })}
              >
                <div className="item-img">
                  <img
                    src={object.productImages[0].original}
                    alt={object.productName}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <div className="product-title">
                  <span style={{ height: "100%", padding: '5px' }}>{object.productName}</span>
                </div>
                <div className="product-price">
                  <span>Price: ₹{object.discountedPrice}</span>
                </div>
              </div>
            );
          })}
      </div>
      <button
        className="view-all-button"
        onClick={() => {
          if (props.productType) {
            const arg = { tags: props.productType };
            dispatch(fetchItemsToDisplay(arg));
            navigate("/ProductUserDisplay");
          }
        }}
      >
        View All
      </button>
    </section>
  );
}
export default ProdByType;
