import React, { useContext, useEffect, useState } from 'react'
import { AddIcon, CartIcon, FavoriteIcon, RatingIcon, SubtractIcon } from '../../assets/icons/icons'
import "./product_details.css";
import CryptoJS from "crypto-js";
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide , Swiper } from 'swiper/react'
import { CartContext, CustomButton, CustomHeader, favoriteContext, Footer, Header, Image, Product } from '../includes/imports';
import { getFlashProducts } from '../../services/userListingsApi';
import { handleApiError } from '../../helpers/errorHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useAddCart } from '../../hooks/useAddCart';
import { useFavorites } from '../../hooks/useAddFav';

import SpinnerLoader from '../includes/SpinnerLoader';
const ProductDetails = () => {

  const {search} = useLocation();
  const navigate = useNavigate()
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [index,setIndex] = useState(0);
const [relativeProducts,setRelativeProducts] = useState([]);
    const [sizeIndex,setSizeIndex] = useState(0);
    const [image,setImage] = useState("")
const [product,setProduct] = useState([]);
const [originalPrice,setOriginalPrice] = useState(0);
const [rating,setRating] = useState(0);
const [remainingRatingStars,setRemainingRatingStars] = useState(0);
const [quantity,setQuantity] = useState(1);
const [AddCartLoading,setAddCartLoading] = useState(false);

useEffect(() => {

  getFlashProducts(null, null, search.split("=")[1])
    .then((res) => {
      const fetchedProduct = res.data;
      setOriginalPrice(Math.floor(fetchedProduct[0].final_price / (1 -  fetchedProduct[0].off_sale / 100)))
  setRating((Math.ceil(fetchedProduct[0].rating/20)))
 setRemainingRatingStars(5 - (Math.ceil(fetchedProduct[0].rating/20)));
      setProduct(fetchedProduct);
      console.log(fetchedProduct)
      

getFlashProducts(null,8,null,null,fetchedProduct[0]?.category_id).then((res)=>{

setRelativeProducts(res.data)
}).catch((error)=>{
      handleApiError(error);
})


      if (fetchedProduct.length > 0) {
        setImage(fetchedProduct[0].images[index] || "");
      }
    })
    .catch((error) => {
      handleApiError(error);
    });
}, [search]);

  const { products, addProduct } = useContext(CartContext);
    const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const [loadingState,setLoadingState] = useState(false)

useEffect(()=>{
  setLoadingState(false)
},[products])


  const { AddToCart} = useAddCart(products, addProduct); 
  
   const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 
   const handleAddToCart = (id,img_id,size=null) => {
    return AddToCart(id,quantity,img_id,size);
    
      };
   const handleFavoriteToggle = (id, title, img, price, rating) => {
     FavoriteToggle(id, title, img, price, rating)
   };

  

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

const handleAddToCartProduct =async()=>{
 if(!products.find((cartProduct)=>cartProduct === product[0].id)){

  await handleAddToCart(product[0].id,product[0].images[index].id,product[0].size.split(",")[sizeIndex])

 }else{
  navigate("/cart");
 }
}

  return (
    <div>
      <Header activePage='product_details'/>
<div className="custom-container mx-auto row py-5">
 
  
  <div className={`${product[0]?.images?.length > 1 ? "product-detail-left-bottom-padding": null} product-detail-left   col-12 col-md-7 bg-color-lightgrey d-flex align-items-center justify-content-center position-relative`}>

{

  product && product.length > 0 && <>
 {product[0].off_sale > 0 &&  <span class="wdp-ribbon d-flex align-items-center wdp-ribbon-two justify-content-center text-light">-{product[0].off_sale}%</span>}

          <Image url={image.img_url} />
      
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
  <Image url={item.img_url}/>
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
 product[0]?.images.map((item,key)=>(
<div key={key} onClick={() => handleSmallImgClick(key)} style={{"--product-color":item?.color}} className={`product-color-btn  p-2 rounded-circle ${index===key && 'product-color-btn-active'}`}></div>    )
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
 <div className="left d-flex col-8">
 <button onClick={handleDecrement} className='p-2 product-details-btn  rounded-1 rounded-end-0'><SubtractIcon/></button>
 <input value={quantity} className='form-control rounded-0 text-center shadow-none' type="number" />
 <button onClick={handleIncrement} className='p-2 product-details-btn   rounded-1 rounded-start-0 '><AddIcon/></button>
 </div>


<div className='col-4 d-flex gap-3'>
<button onClick={()=>handleFavoriteToggle(product[0].id,product[0].name,product[0].images[index],product[0].final_price,product[0].rating)} className={`product-details-btn product-details-fav-icon shadow-sm d-flex align-items-center justify-content-center   rounded-1 ${!!favProducts.find((favProduct) => {return favProduct.id === product[0].id}) && "product-detail-fav-active" }`}><FavoriteIcon/></button>
<button onClick={handleAddToCartProduct} className={`product-details-btn product-details-fav-icon shadow-sm d-flex align-items-center justify-content-center   rounded-1 ${!!products.find((cartProduct)=>{return cartProduct === product[0].id}) && "product-detail-fav-active" }`}>{AddCartLoading ? <div className="cart-spinner"> </div>  : <CartIcon/> }</button>
</div>
</div>
<button onClick={handlePlaceOrder} className="center py-2 mt-4 w-100 bg-color-orange border-0 rounded-1 text-light">
Order Now
 </button>
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


<div className=''>
      <CustomHeader smallHeading="Related Products"  />
      
      <div className='product-container row gx-0 gx-sm-4 gy-5 mt-0'>
        {relativeProducts && relativeProducts.length > 0 && relativeProducts.map((item) => (
          <div key={item.id} className='col-12 col-sm-4 col-lg-3'>
         <Product
                    id={item.id}
                    img={item.images[0]}
                    price={item.final_price}
                    rating={item.rating}
                    offSale={item.off_sale}
                    title={item.name}
                    loadingState={loadingState}
                    isNew={true}
                    exist={
                      !!favProducts.find((product) => product.id === item.id)
                    }
                    existInCart = {!!products.find((product)=>product === item.id)}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleFavoriteToggle}
             
                  />
          </div>
        ))}
      </div>
              
   {relativeProducts && relativeProducts.length > 0 &&    <div className='d-flex justify-content-center mt-5'>
        <CustomButton text="View All Products"  link={`/products?cat=${relativeProducts[0]?.category_id}`} />
      </div>}
    </div>
</div>





      <Footer/>
    </div>
  )
}

export default ProductDetails
