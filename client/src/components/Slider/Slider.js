import React, {useEffect, useState} from 'react'
import './Slider.css'
import dataSlider from './dataSlider'
import BtnSlider from './btnSlider';
import {v4 as uuidv4} from "uuid"


export default function Slider() {
    const [slideIndex,setSliderIndex]=useState(1);
    
    const nextSlide=()=>{
        if(slideIndex!==dataSlider.length){
     setSliderIndex(prev=>
        prev+1
     )}
     else{
        setSliderIndex(1);
     }
    }
    const prevSlide=()=>{
        if(slideIndex!==1){
        setSliderIndex(prev=>
            prev-1
         )}
         else{
           setSliderIndex(dataSlider.length);
         }
        }
        //function to change slider automatically
        useEffect(()=>{
        const timer=setTimeout(()=>{
            if(slideIndex!==dataSlider.length)
            setSliderIndex(prev=>prev+1)
            else
            setSliderIndex(1)
        },4000)
        return ()=>clearTimeout(timer);
    },[slideIndex,dataSlider])
    // Without clearTimeout, if you keep changing slides or if the component is removed, you could end up with multiple timeouts all trying to update the slides, causing weird behavior or errors. Cleaning up with clearTimeout makes sure everything stays neat and works correctly.


   return (
        <div className="container-slider" style={{width:'100%'}}>
            {dataSlider.map((obj, index) => {
                return (
                    <div 
                    key={obj.id}
                    className={slideIndex===index+1?'active-anim':'slide'}>
                        <img 
                        className='slider-image'
                        src={obj.url} 
                        />
                          {/* <div className="text-container">
                           <h2>{obj.title}</h2>
                           <span>{obj.subTitle}</span>
                          </div> */}
                        </div>
                    
                )
            })}
            <BtnSlider moveSlide={prevSlide} direction={"prev"} style={{width:'5rem'}} />
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <div className='container-dots'>
                {Array.from({length:dataSlider.length}).map((item,index)=>(
                    <div key={index}  onClick={()=>setSliderIndex(index+1)} className={slideIndex===index+1?'active-dot':'dot'}></div>
                ))}
            </div>
        </div>
    )
}