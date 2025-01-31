import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { ArrowLEFT, RightFaqArrow, SendIcon, SocialMediaIcon1, SocialMediaIcon2, SocialMediaIcon3, SocialMediaIcon4 } from "../../../assets/icons/icons";
import { faqsData } from "../../../assets/data";
export const Footer = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showFaq,setShowFaq] = useState(false);
  const [showPolicy,setShowPolicy] = useState(false);
  const [showTerms,setShowTerms] = useState(false);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClick = (index)=>{
    setShowFaq(false);
    setShowPolicy(false);
    setShowTerms(false);
   setOpenIndex(0);
    if(index === 0){setShowPolicy(true)}
    else if(index ===1){setShowTerms(true)}
    else if (index ===2){setShowFaq(true)}

  }

  return (
    <div className="footer-container bg-color-black color-light">
      <div className="modal  fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-dark">

  {showFaq &&     <div className="faq-container">
      {faqsData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className={`faq-question ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className={`arrow ${openIndex === index ? "open" : ""}`}><RightFaqArrow/></span>
          </div>
          <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>}
 {
  showPolicy &&  <div className="container mx-auto p-2">
  <h1 className="fs-4 font-bold mb-2">Privacy Policy</h1>
  <h2 className="fs-5 font-semibold mt-2">1. Introduction</h2>
  <p className="fs-6">Welcome to <strong>FitStyl</strong>! Your privacy is important to us...</p>
  
  <h2 className="fs-5 font-semibold mt-2">2. Information We Collect</h2>
  <ul className="list-disc ml-6">
    <li><strong>Personal Information</strong>: Name, email, phone, etc.</li>
    <li><strong>Order Information</strong>: Product details, transaction history.</li>
    <li><strong>Usage Data</strong>: Site interactions, pages visited.</li>
  </ul>
</div>
 }
  {
  showTerms &&  <div className="container mx-auto p-2">
  <h1 className="fs-4 font-bold mb-2">Terms and Conditions</h1>
  <h2 className="fs-5 font-semibold mt-2">1. Introduction</h2>
  <p className="fs-6">Welcome to <strong>FitStyl</strong>! Your privacy is important to us...</p>
  
  <h2 className="fs-5 font-semibold mt-2">2. Information We Collect</h2>
  <ul className="list-disc ml-6">
    <li><strong>Personal Information</strong>: Name, email, phone, etc.</li>
    <li><strong>Order Information</strong>: Product details, transaction history.</li>
    <li><strong>Usage Data</strong>: Site interactions, pages visited.</li>
  </ul>
</div>
 }
      </div>
      
    </div>
  </div>
</div>
      <div className="custom-container mx-auto row py-5 gx-0">
        <div className="col-12 col-lg-3 pe-5">
          <h2>FitStyl</h2>

          <label htmlFor="contact-email " className="fs-5 mt-5">Follow us:</label>

          <span className="footer-icons mt-3 d-flex gap-4 my-4">
           <Link>
           <SocialMediaIcon1/>
           </Link>
            <Link><SocialMediaIcon2/></Link>
           <Link><SocialMediaIcon3/></Link>
            <Link><SocialMediaIcon4/></Link>
          </span>
        </div>
        <div className="col-12 col-sm-4 col-lg-3">
          <h5 className="mb-3 text-light">Support</h5>
          <div className="d-flex flex-column gap-2">
            <span>We’re here to help! Contact our support team for quick assistance</span>
            <span><Link>abc@gmail.com</Link></span>
            <span><Link>+92-232-2232-232</Link></span>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-4 col-md-3 mt-3 mt-sm-0">
          <h5 className="mb-3 text-light">Account</h5>
          <ul className="d-flex flex-column gap-2 list-unstyled">
            <li><Link to="/account"> My Account </Link></li>
            <li><Link to="/login"> Login / Register </Link></li>
            <li><Link to="/cart"> Cart </Link></li>
            <li><Link to="/favorites"> Wishlish </Link></li>
            <li><Link to="/"> Shop </Link></li>
          </ul>
        </div>
        <div className="col-12 col-sm-4 col-4 col-md-3 mt-3 mt-sm-0">

        <h5 className="mb-3 text-light">Quick Link</h5>
          <ul className="d-flex flex-column gap-2 list-unstyled">
          <li onClick={()=>handleClick(0)} className="quick-link-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><div >Privacy Policy</div></li>
            <li onClick={()=>handleClick(1)} className="quick-link-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><div >Terms Of Use</div></li>
            <li onClick={()=>handleClick(2)} className="quick-link-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><div >FAQ</div></li>
            <li><Link to="/contact"> Contact </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
