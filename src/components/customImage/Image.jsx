import React, { useState } from 'react'
import "./image.css"
import imagePlceholder from "../../assets/images/no-image.png";
import Skeleton from 'react-loading-skeleton';
import { AnimatedImageLoader } from '../../assets/icons/icons';

export const Image = ({url}) => {
    const [img, setImageSrc] = useState(url);
    const [isLoaded, setIsLoaded] = useState(false);
    
  return (
    <>
      <img className='user-select-none' src={img} alt=""style={{ display: isLoaded ? "block" : "none" }}
      onLoad={() => setIsLoaded(true)}
      onError={() => setImageSrc(imagePlceholder)}
    />
{!isLoaded && <div className='loader'></div> }
    </>

  )
}

