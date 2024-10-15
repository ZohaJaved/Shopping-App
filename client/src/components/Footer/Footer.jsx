import React from "react";
import "./Footer.css"
import { useNavigate } from "react-router-dom";

function Footer(){
    const navigate=useNavigate();
        return (
            <div style={{marginTop:'2px'}}>
                <div className="footer-area" >
                    <div className="container" >
                        <div className="row" style={{border:'1px solid none'}}>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Kabeer Interprices</h4>
                                {/* <div className="footer-underline"></div> */}
                                <p>
                                Welcome to Kabeer Enterprises, your trusted partner in the printing and typesetting industry. With a legacy dating back to the 1900s, we have been at the forefront of innovation and quality. 
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Quick Links</h4>
                                {/* <div className="footer-underline"></div> */}
                                <div className="mb-2" onClick={()=>navigate('/Home')}>Home</div>
                                <div className="mb-2">About Us</div>
                                <div className="mb-2">Contact Us</div>
                                <div className="mb-2">Blogs</div>
                                
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Shop Now</h4>
                                {/* <div className="footer-underline"></div> */}
                                <div className="mb-2" onClick={()=>navigate('/Home')}>Collections</div>
                                <div className="mb-2" onClick={()=>navigate('/Home')}>Trending Products</div>
                                <div className="mb-2">New Arrivals Products</div>
                                <div className="mb-2">Featured Products</div>
                                <div className="mb-2" onClick={()=>navigate('/cart')}>Cart</div>
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Reach Us</h4>
                                {/* <div className="footer-underline"></div> */}
                                <div className="mb-2">
                                    <p>
                                        <i className="fa fa-map-marker"></i> #444,  main road, Roshanbagh, Prayagraj, india - 211003
                                    </p>
                                    
                                    <p>
                                        Contact Number:7825789271
                                    </p>
                                </div>
                                <div >
                                    <a style={{color:'black '}} href="tel:+918888888888">
                                        <i className="fa fa-phone"></i> +91 888-XXX-XXXX
                                    </a>
                                </div>
                                <div  >
                                    <a style={{color:'black '}} href="mailto:kabeerFashion251.com"  >
                                        <i  ></i> mailto:kabeerFashion251@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
    
    export default Footer;
    