import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { SendIcon, SocialMediaIcon1, SocialMediaIcon2, SocialMediaIcon3, SocialMediaIcon4 } from "../../../assets/icons/icons";
const Footer = () => {
  return (
    <div className="footer-container bg-color-black color-light">
      <div className="custom-container mx-auto row py-5 gx-0">
        <div className="col-12 col-lg-3 pe-5">
          <h2>Exclusive</h2>

          <label htmlFor="contact-email " className="fs-5">Subracribe</label>

          <form className="form mt-2 d-flex border border-1 border-light rounded-2 px-3 py-1 align-items-center">
            <input
              type="email"
              name="contact-email"
              className="form-control border-0 shadow-none bg-transparent text-light ps-0"
              placeholder="Enter Your Email"
            />
      <span className="input-send-icon "><SendIcon/></span>
          </form>
          <span className="footer-icons mt-4 d-flex gap-4 my-4">
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
            <span>Lorem ipsum dolor, sit amet consectetur </span>
            <span><Link>abc@gmail.com</Link></span>
            <span><Link>+92-232-2232-232</Link></span>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-4 col-md-3 mt-3 mt-sm-0">
          <h5 className="mb-3 text-light">Account</h5>
          <ul className="d-flex flex-column gap-2 list-unstyled">
            <li><Link> My Account </Link></li>
            <li><Link> Login / Register </Link></li>
            <li><Link> Cart </Link></li>
            <li><Link> Wishlish </Link></li>
            <li><Link> Shop </Link></li>
          </ul>
        </div>
        <div className="col-12 col-sm-4 col-4 col-md-3 mt-3 mt-sm-0">

        <h5 className="mb-3 text-light">Quick Link</h5>
          <ul className="d-flex flex-column gap-2 list-unstyled">
            <li><Link> Privacy Policy </Link></li>
            <li><Link> Terms Of Use </Link></li>
            <li><Link> FAQ </Link></li>
            <li><Link> Contact </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
