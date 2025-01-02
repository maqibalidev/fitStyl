import React, { useState } from 'react'
import "./contact.css"
import { Link } from 'react-router-dom'
import logo from "../../assets/images/fs_logo.low.webp"
import { Footer, Header,CallIcon, MailIcon, SendIcon } from '../includes/imports'
const Contact = () => {
    const [chatting,setChatting] = useState(false)
  return (
    <div className='d-flex flex-column vh-100 justify-content-between'>
      <Header/>
<div className='custom-container mx-auto py-5'>


    <div className="row">
        <div className="col-3 d-flex flex-column gap-3 justify-content-center my-auto ">
    <div className='d-flex flex-column gap-3'>
    <span className='d-flex gap-2 align-items-center'><span className='p-2 rounded-circle bg-color-orange lh-1 text-light'><CallIcon/></span> <h6 className='mb-0'>Call To Us</h6></span>
        <span className='fw-medium'>Phone: <Link className='fw-normal' to="tel:+92-3207043815">+923207043815</Link></span>
       
    </div>
    <div className='d-flex flex-column gap-3'>
    <span className='d-flex gap-2 align-items-center'><span className='p-2 rounded-circle bg-color-orange lh-1 text-light'><MailIcon/></span> <h6 className='mb-0'>Call To Us</h6></span>
        <div className='fw-medium'>Email: <Link className='fw-normal' to="mailto:maqibali2002g@gmail.com">fitstyl@gmail.com</Link></div>
        <div className='fw-medium'>Email: <Link className='fw-normal' to="mailto:maqibali2002g@gmail.com">fitstyl@gmail.com</Link></div>

    </div> 
        </div>
       {
chatting ? (
    <div className="col-9 contact-right  shadow-normal rounded-2 position-relative px-0">

    <div className="chat-container d-flex flex-column h-100 p-3">
        <div className="chatting-sec ">
    
        <div className=''>
        <div className="contact-message">
        <div className='p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light'>Me</div>
        <div className='contact-msg-text w-75 text-light rounded-bottom-2 rounded-end-2 lh-2 p-2 mt-2 ms-2'>Lorem ipsum asdas asd asd asd asd as dasd ad dolor sit amet.</div>
        </div>
        
    </div>
    
      {[...Array(6)].map((item,key)=>(  
        <div className=' float-end my-2'>
        <div className="contact-message d-flex flex-column align-items-end">
        <div key={key} className='p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light '>
            <img src={logo} alt="" height={40} width={40} />
        </div>
        <div className='contact-admin-msg-text w-75 text-light rounded-bottom-2 rounded-start-3 lh-2 p-2 mt-2 ms-2'>Lorem ipsum asdas asd asd asd asd as dasd ad dolor sit amet.</div>
        </div>
        </div>
        ))} 
    
        </div>
     
    </div>
    
    
    <form className='form position-absolute   d-flex bottom-0 start-0 end-0 mx-auto  z-1 p-2'>
    <input className='form-control py-2 px-3 shadow-none rounded-5' type="text"  placeholder='Type a message'/>
    <button className='btn btn-success border-0 bg-color-green rounded-circle ms-2 contact-msg-send-btn'><SendIcon/></button>
    </form>
    
            </div>
) :

<div onClick={()=>setChatting(true)} className='col-9 py-5 h-100 d-flex align-items-center justify-content-center'>
    <button className=' border-0 bg-color-orange text-light p-2 rounded-2 mt-3'>Start chatting with us</button>
</div>
       }
    </div>

</div>
      <Footer/>
    </div>
  )
}

export default Contact
