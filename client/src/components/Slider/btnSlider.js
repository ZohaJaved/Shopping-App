import React from 'react'
import  "./Slider.css";
import leftArrow from "./icons/left-arrow.svg"
import rightArrow from "./icons/right-arrow.svg"

export default function btnSlider({direction,moveSlide}) {
  return (
    <div style={{width:'50px' ,height:'auto'}} >
      <button onClick={moveSlide} className={direction==='next'?'btn-slide-next':'btn-slide-prev'}>
      <img className='arrow-icon'  src={direction ==='next'?rightArrow:leftArrow} />

      </button>
    </div>
  )
}
