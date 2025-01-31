import React, { useContext, useEffect, useState } from 'react'
import {Header,Footer, AuthContext, CartContext} from "../includes/imports"
import { Link, useLocation } from 'react-router-dom'
import { paymentGateWaysData } from '../../assets/data'
import "./place-order.css"
import CryptoJS from "crypto-js";
import { getCartItems, getFlashProducts } from '../../services/userListingsApi'
import { handleApiError } from '../../helpers/errorHandler'
const PlaceOrder = () => {

    const [paymentMethod,setPaymentMethod] = useState(0);
      const [products, setProducts] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      const [loading, setLoading] = useState(true);
      const authContext = useContext(AuthContext);
      const location = useLocation();




    
      useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("product"); 
        const decrypted = CryptoJS.AES.decrypt(
            decodeURIComponent(id),
            process.env.REACT_APP_CRYPTOJS_SEC
          ).toString(CryptoJS.enc.Utf8);
    
          if (!decrypted) throw new Error("Decryption resulted in an empty string.");
    
          const parsedData = JSON.parse(decrypted);
          console.log("Parsed Data:", parsedData);

   if(id){
getFlashProducts(null,null,parsedData.id).then((res)=>{
    setLoading(false);
    setProducts([{img_url:res?.data[0].images[parsedData.image_index],name:res.data[0].name,final_price:res.data[0].final_price,color:parsedData.color,size:parsedData.size,quantity:parsedData.quantity}]);

    const total = res.data.reduce((sum, product) => sum + (product.final_price || 0 ), 0);
    setTotalPrice(total);
}).catch((err)=>{
    setLoading(false);
    handleApiError(err);
})
   }
   else{
    if(authContext?.data?.authToken){
        getCartItems(authContext?.data?.authToken)
        .then((res) => {
          setLoading(false);
          setProducts(res.data);
      console.log(products)
          const total = res.data.reduce((sum, product) => sum + (product.final_price || 0), 0);
          setTotalPrice(total);
        })
        .catch((err) => {
          setLoading(false);
          handleApiError(err);
        });
       }
   }
      }, []); 
const handlePaymentClick = (index)=>{
setPaymentMethod(index)
}

  return (
    <div className='vh-100 d-flex flex-column justify-content-between'>
      <Header activePage='place order'/>
      <div className='custom-container mx-auto flex-grow-1 py-5'>
      <div className="text-muted mt-0">
          <Link to="/">Home</Link> / <span className="text-dark fw-medium">Order</span>
        </div>



        <div className="row">
            <div className=" col-12 col-md-6">
                <form className='form d-flex flex-column gap-3 my-5'>
                    <input className='form-control shadow-none shadow-none' name='username' type="text" placeholder="Username" />
                    <input className='form-control shadow-none' name='email' type="email" placeholder="Enter your email" />
                    <input className='form-control shadow-none' name='phone_no' type="number" placeholder="+92-0000000000" />
                    <div className='d-flex gap-2'>
                    <input className='form-control shadow-none' name='street' type="number" placeholder="Street" />
                    <input className='form-control shadow-none' name='house_no' type="number" placeholder="House no" />
                    <input className='form-control shadow-none' name='colony' type="text" placeholder="Colony" />
                    </div>
                    <textarea className='form-control shadow-none' name='colony' placeholder="Detailed Address (Optional)" />
                    
                    <div className='d-flex gap-2'>
                  {
                    paymentGateWaysData.map((item,index)=>(
                        <div onClick={()=>{handlePaymentClick(index)}} className={`d-flex rounded-2 justify-content-center flex-column align-items-center payment-gateway-item ${paymentMethod === index && "payment-gateway-item-active"}`}>
                        <img src={item.img} alt="" height={50} width={50} />
                        <span>{item.name}</span>
                         </div>
                    ))
                  }
                        
                    </div>
                </form>
            </div>
            <div className="col-12 col-md-6 px-0 px-md-4">
<div className='d-flex flex-column gap-3 place-order-items-container p-2'>
{products.map((item,index)=>(
    <div className="place_order-item d-flex align-items-center gap-3 shadow-sm px-3 py-2 rounded-2">
    <img src={item.img_url} height={80} width={80} />
   <div className='flex-grow-1'>
   <span className=' fw-semibold'>{item.name}</span>
   <div className='p-2 place-order-item-color d-flex rounded-circle' style={{ "--place-order-item-color": item.color }}>
  
</div>

   <span>{item.size}</span>
   </div>
<div className='d-flex flex-column gap-1'>
<div><span>Rs.{item.final_price}</span>
<span className='fw-semibold color-primary'> X</span>
<span> {item.quantity}</span></div>
<span><span className='fw-semibold'>Subtotal:</span>  Rs.{item.final_price*item.quantity}</span>
</div>
</div>
))}
</div>

<div className='w-100 px-2'>


{totalPrice > 0 ? (
          <div className="total-container w-100 p-4 rounded-2 border mt-5 float-end ">
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Subtotal:</span> <span>${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Delivery:</span> <span>$175</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Total:</span> <span>${totalPrice + 175}</span>
            </div>
            <button
              disabled={totalPrice <= 0}
              className={`w-100 mt-4 ${
                totalPrice > 0
                  ? "bg-color-orange text-light"
                  : "bg-color-lightgrey text-dark"
              } p-2 border-0 rounded-1`}
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <>
            {products && products.length > 0 && (
              <div className="text-center">
                Total price of available items will appear here.
              </div>
            )}
          </>
        )}

</div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PlaceOrder
