import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "./ProductDetailsPage.css" ;
import { useDispatch } from 'react-redux';
import { add_to_cart } from '../../state/features/cartSlicer';
import cartIcon from "../../navIcons/cart.svg"
import logoutIcon from "../../navIcons/logout.svg"
import orderIcon from "../../navIcons/orderIcon.svg"
import AccountIcon from "../../navIcons/person.svg"
import homeIcon from "../../navIcons/home.svg"
import Navbars from '../Navbar/Navbars';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function ProductDetailsPage() {
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();

  const [quantity,setQuantity]=useState(1)
  const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
  const productDetailItem=location.state?.object;

  const addToCart=()=>{
    if(productDetailItem)
    {
      console.log("productDetailItem==",productDetailItem);
      console.log("quantity",quantity);
      dispatch(add_to_cart({
        productDetails: productDetailItem,
        quantityIncrement: quantity
    }));
    }
  }
  
  // console.log("productDetailItem",productDetailItem)
  return (
    <div style={{marginBottom:'5px'}}>
      <Navbars navElements={navElements} showSearchbar={true}/>
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={productDetailItem.productImages}
        />

        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetailItem.productName}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={4.0}
            />

            <p className="ml-3 text-sm text-gray-400">
              {productDetailItem.reviews}
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.sizes ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          Brand: <span className="font-normal">{productDetailItem.brand}</span>
        </p>
        <p className="font-bold">
          Category:{" "}
          <span className="font-normal">{productDetailItem.category}</span>
        </p>
        <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
        ₹{productDetailItem.discountedPrice}{" "}
          <span className="text-xs text-gray-400 line-through">
          ₹{productDetailItem.basePrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetailItem.sizes&&productDetailItem.sizes.length>0&& productDetailItem.sizes.map((size, index) => {
              console.log("productDetailItem.sizes",size);
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {size.size}
                </div>
              );
            })}
          </div>
        </div> */}
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.colors&&productDetailItem.colors.length>0&&productDetailItem.colors.map((x, index) => {
              console.log("color",x)
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div> */}
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex">
            <button className='plusMinuceButton' onClick={()=>{if(quantity>1)setQuantity(prev=>prev-1)}}>−</button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              {quantity}
            </div>
            <button className={`plusMinuceButton`} onClick={()=>setQuantity(prev=>prev+1)}> +</button>
          </div>
        </div>
        <div className="mt-7 flex flex-row items-center gap-6">
          <button onClick={() => addToCart()}  className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
            <BiShoppingBag className="mx-2" />
           <span> Add to cart</span>
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300" onClick={()=>navigate("/Cart")}>
            Go To Cart
          </button>
        </div>
      </div>
    </section>
    <Footer className='footer' style={{marginTop:'5px'}}/>
    </div>
  );
};


