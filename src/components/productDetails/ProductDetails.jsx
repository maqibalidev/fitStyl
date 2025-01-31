import React, { useEffect, useState } from 'react'
import { AddIcon, FavoriteIcon, RatingIcon, SubtractIcon } from '../../assets/icons/icons'
import "./product_details.css";
import CryptoJS from "crypto-js";
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide , Swiper } from 'swiper/react'
import { Footer, Header, Image } from '../includes/imports';
import { getFlashProducts } from '../../services/userListingsApi';
import { handleApiError } from '../../helpers/errorHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
const ProductDetails = () => {

  const {search} = useLocation();
  const navigate = useNavigate()
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [index,setIndex] = useState(0);
    const [colorIndex,setColorIndex] = useState(0);
    const [sizeIndex,setSizeIndex] = useState(0);
    const [image,setImage] = useState("")
const [product,setProduct] = useState([]);
const [originalPrice,setOriginalPrice] = useState(0);
const [rating,setRating] = useState(0);
const [remainingRatingStars,setRemainingRatingStars] = useState(0);
const [quantity,setQuantity] = useState(1);
useEffect(() => {
  // Fetch the product data
  getFlashProducts(null, null, search.split("=")[1])
    .then((res) => {
      const fetchedProduct = res.data;
      setOriginalPrice(Math.floor(fetchedProduct[0].final_price / (1 -  fetchedProduct[0].off_sale / 100)))
  setRating((Math.ceil(fetchedProduct[0].rating/20)))
 setRemainingRatingStars(5 - (Math.ceil(fetchedProduct[0].rating/20)));
 console.log(remainingRatingStars)
      setProduct(fetchedProduct);
      if (fetchedProduct.length > 0) {
        setImage(fetchedProduct[0].images[index] || "");
      }
    })
    .catch((error) => {
      handleApiError(error);
    });
}, [search]);


  

const  handleSmallImgClick = (index)=>{
  setIndex(index)
  setImage(product[0].images[index]);
  if (swiperInstance) {
    swiperInstance.slideTo(index); // Scroll to the specific slide
  }
  
}
const handleIncrement = () => {
  setQuantity((prev) => prev + 1);

};

const handleDecrement = () => {
  if (quantity > 1) {
    setQuantity((prev) => prev - 1);

  }
};

const handlePlaceOrder = () => {
  const productInfo = {
    id: product[0].id,
    color: product[0].colors.split(",")[colorIndex],
    size: product[0].size.split(",")[sizeIndex],
    image_index:index,
    quantity:quantity
  };

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(productInfo),
    process.env.REACT_APP_CRYPTOJS_SEC
  ).toString();

  console.log("Encrypted Data:", encrypted);
  navigate(`/place_order?product=${encodeURIComponent(encrypted)}`);
};

  return (
    <div>
      <Header activePage='product_details'/>
<div className="custom-container mx-auto row py-5">
 
  
  <div className={`${product[0]?.images?.length > 1 ? "product-detail-left-bottom-padding": null} product-detail-left  col-12 col-md-7 bg-color-lightgrey d-flex align-items-center justify-content-center position-relative`}>
{

  product && product.length > 0 && <>
          <Image url={image} />
          {
  product[0]?.images?.length > 1 ?
<div className="product-images-bottom position-absolute bottom-0 start-0 end-0 mx-auto d-flex">

 <Swiper
  spaceBetween={10}
  onSwiper={(swiper) => setSwiperInstance(swiper)} 
          slidesPerView={2}
             pagination={{
            el: ".flash_sales-custom-pagination", 
            bulletClass: "flash_sales_bullet", 
            bulletActiveClass: "flash_sales_bullet-active",
            clickable: true,
          }}
          modules={[Navigation,Pagination]}
          breakpoints={{
          
            576:{
              slidesPerView:3,
              spaceBetween:20
            },
            992:{
              slidesPerView:4,
            },
          }}
         
          className='my-2 my-sm-2 mx-2 w-100'
          navigation={{
            prevEl: ".product-detail-prev",
            nextEl: ".product-detail-next",
          }}
        
  >
  
  {product[0].images.map((item, key) => (
  <SwiperSlide key={key} className=''>
  <div
  onClick={() => handleSmallImgClick(key)}
  className={`product-details-img-item d-flex align-items-center justify-content-center p-3 rounded-2 ${
  index === key ? "product-details-img-item-selected" : ""
  }`}
  >
  <Image url={item}/>
  </div>
  </SwiperSlide>
  ))}
    
  </Swiper>

 
</div>  :
  null
}
  </>
}
    </div>


    {
    product && product.length > 0 ? 
   <div className="col-12 col-md-5 px-0 py-5 px-md-3 px-lg-5 ">
  
  
    <div className='border-bottom border-1 border-dark d-flex flex-column gap-2 pb-3'>
  <h4>{product[0].name}</h4>
   <div  className='d-flex gap-2 align-items-center'>
  {[...Array(rating)].map((_, index) => (
            <RatingIcon
              key={index}
              color={"var(--primary-color)"}
            />
          ))}
              {rating < 5 && [...Array(remainingRatingStars)].map((_, index) => (
            <RatingIcon
              key={index}
              color={"var(--light-grey-color)"}
            />
          ))}
       <span className='color-lightgrey'>({product[0].rating} Reviews)</span>
     </div>

     <span className="prices color-primary fw-medium fs-4">
          ${product[0].final_price}.00
         {product[0].off_sale > 0 &&  <span className="fs-5 ms-2 text-decoration-line-through color-lightgrey fw-medium">
            ${originalPrice}.00
          </span>}
        </span>

     <p className='mt-2'>{product[0].product_desc}</p>
    </div>

<div className="colors-container d-flex align-items-center gap-2 py-3">
 <span className='fs-4'>Colors:</span>
 
 <div className='d-flex gap-2'>
 {
 product[0].colors.split(",").map((item,key)=>(
<div key={key} onClick={()=>setColorIndex(key)} style={{"--product-color":item}} className={`product-color-btn  p-2 rounded-circle ${colorIndex===key && 'product-color-btn-active'}`}></div>    )
)
}

 

 </div>
</div>

<div className="size-container d-flex align-items-center gap-3 py-2">
<span className='fs-4 me-2'>Sizes:</span>
{
 product[0].size.split(",").map((item,key)=>(
     <button onClick={()=>setSizeIndex(key)} key={key}  className={`product-size-btn shadow-sm d-flex align-items-center justify-content-center rounded-1 ${sizeIndex===key && 'product-size-btn-active'}`}>{item}</button>
 ))
}

</div>

<div className="d-flex row justify-content-between gx-3 mt-4">
 <div className="left d-flex col-5">
 <button onClick={handleDecrement} className='p-2 product-details-btn  rounded-1 rounded-end-0'><SubtractIcon/></button>
 <input value={quantity} className='form-control rounded-0 text-center shadow-none' type="number" />
 <button onClick={handleIncrement} className='p-2 product-details-btn   rounded-1 rounded-start-0 '><AddIcon/></button>
 </div>
 <button onClick={handlePlaceOrder} className="center col-4 bg-color-orange border-0 rounded-1 text-light">
Order Now
 </button>

<div className='col-2'>
<button className='product-details-btn product-details-fav-icon shadow-sm p-2  rounded-1'><FavoriteIcon/></button>
</div>
</div>

 </div>

:
<div className='col-12 col-md-5 px-0 py-5 px-md-3 px-lg-5'>
<Skeleton count={3}/>
<Skeleton count={2} className='w-50'/>
<Skeleton count={3} className='mt-4'/>
<Skeleton count={2} className='w-50'/>
<Skeleton count={1} className='mt-4' height={40}/>

</div>  

}
</div>
      <Footer/>
    </div>
  )
}

export default ProductDetails
