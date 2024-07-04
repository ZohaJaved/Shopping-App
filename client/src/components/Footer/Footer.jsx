import React from "react";
import "./Footer.css"

function Footer(){
    
        return (
            <div>
                <div className="footer-area" style={{backgroundColor:'#d6e7ee'}}>
                    <div className="container" style={{marginLeft:'8%',marginBottom:'5%',width:'100%',border:'none'}}>
                        <div className="row">
                            <div className="col-md-3">
                                <h4 className="footer-heading">Kabeer Interprices</h4>
                                <div className="footer-underline"></div>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Quick Links</h4>
                                <div className="footer-underline"></div>
                                <div className="mb-2">Home</div>
                                <div className="mb-2">About Us</div>
                                <div className="mb-2">Contact Us</div>
                                <div className="mb-2">Blogs</div>
                                
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Shop Now</h4>
                                <div className="footer-underline"></div>
                                <div className="mb-2">Collections</div>
                                <div className="mb-2">Trending Products</div>
                                <div className="mb-2">New Arrivals Products</div>
                                <div className="mb-2">Featured Products</div>
                                <div className="mb-2">Cart</div>
                            </div>
                            <div className="col-md-3">
                                <h4 className="footer-heading">Reach Us</h4>
                                <div className="footer-underline"></div>
                                <div className="mb-2">
                                    <p>
                                        <i className="fa fa-map-marker"></i> #444,  main road, Roshanbagh, Prayagraj, india - 211003
                                    </p>
                                    
                                    <p>
                                        Contact Number:7825789271
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <a href="tel:+918888888888" className="text-white">
                                        <i className="fa fa-phone"></i> +91 888-XXX-XXXX
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a href="mailto:fundaofwebit@gmail.com" className="text-white">
                                        <i className="fa fa-envelope"></i> fundaofwebit@gmail.com
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
    