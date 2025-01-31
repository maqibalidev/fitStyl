import React, { useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/fs_logo.low.webp";
import {
  AccountIcon,
  CartIcon,
  FavoriteIcon,
  LogoutIcon,
  OrdersIcon,
  RatingIcon,
} from "../../../assets/icons/icons";
import HeaderMenuItemIcon from "./HeaderMenuItemIcon";
import HeaderSearchInput from "./HeaderSearchInput";
import { AuthContext, CartContext, favoriteContext } from "../imports";
import { toast } from "react-toastify";

 export const Header = ({activePage="home"}) => {
    const authContext = useContext(AuthContext);
      const { favProducts} = useContext(favoriteContext);
      const { products} = useContext(CartContext);
  const [showFloatingInput, setFloatingInput] = useState(false);
  const [isLogin,setIsLogin] = useState(false);
  const navLinks = [
    { label: "Home", url: "/", active: activePage==="home"},
    { label: "Contact", url: "/contact", active : activePage === "contact" },
    { label: "About", url: "/about", active: activePage==="about"},
    !authContext.data.authToken && { label: "Sign Up", url: "/signup", active: activePage==="signup"},
  ];

  useEffect(()=>{
    if(authContext.data.authToken){
      setIsLogin(true)
    }
    setIsLogin(false)
      },[isLogin])


  const headerSearchContainerRef = useRef(null);

  // Handle clicking outside of the search input to close it
  const handleClick = (event) => {
    if (event.target.id === "header-search-container") {
      setFloatingInput(false);
    }
  };


  const handleLogout = ()=>{
if(authContext.data.authToken){
  authContext.dispatch({type:"LOGOUT"});
  toast.success("logged out successfully!")
}
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg py-2 py-sm-4 border border-bottom-3 border-muted">
        <div className="container-fluid custom-container px-0">
          {/* LOGO */}
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="logo" height={30} />
          </Link>

          {/* HEADER MENU ICON BUTTON */}
          <div className="header-right gap-4 icons-container align-items-center d-flex">
            <div className="d-none d-sm-flex d-lg-none gap-3">
              <div className="d-flex bg-light rounded-circle">
                <button
                  onClick={() => setFloatingInput(true)}
                  className="bg-transparent header-search-icon-btn border-0 d-flex align-items-center justify-content-center px-0"
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>

           {authContext.data.authToken && <>
            <HeaderMenuItemIcon Icon={FavoriteIcon} count_label={favProducts.length} link="/favorites"/>
              <HeaderMenuItemIcon Icon={CartIcon} count_label={9} link="/cart" />
          <HeaderMenuItemIcon
                isDropMenu={true}
                Icon={AccountIcon}
                dropMenuItems={[
                  { label: "Manage My Account",link:"/account", Icon: <AccountIcon /> ,active :activePage==="account"  },
                  { label: "My Order", Icon: <OrdersIcon />, active :activePage==="orders"},
                  { label: "My Reviews", Icon: <RatingIcon /> ,active :activePage==="reviews"},
                  { label: "Logout", Icon: <LogoutIcon /> ,handleClick:handleLogout},
                ]}
              /></>}
            </div>
            <button
              className="navbar-toggler border-0 shadow-none px-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* HEADER LINKS */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-4 mt-2 mt-lg-0">
              {navLinks.map((item, key) => (
                <li key={key} className="nav-item header-links mx-2">
                  <Link
                    className={`nav-link header-link ${item.active ? "active position-relative" : ""} p-0`}
                    aria-current="page"
                    to={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* HEADER LEFT (small to large screens) */}
            <div className="header-right gap-2 align-items-center d-none d-lg-flex">
              <form className="d-flex bg-light rounded-1 px-2 ">
                <input
                  className="header-search-input form-control py-2 me-2 outline-none shadow-none border-0 bg-transparent"
                  placeholder="What are you looking for?"
                  aria-label="Search"
                />
                <button className="bg-transparent border-0 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </form>
           {
            authContext.data.authToken && <>
               <HeaderMenuItemIcon Icon={FavoriteIcon} count_label={favProducts.length} link="/favorites"/>
              <HeaderMenuItemIcon Icon={CartIcon} count_label={products.length} link="/cart" />
             <HeaderMenuItemIcon
                isDropMenu={true}
                Icon={AccountIcon}
                dropMenuItems={[
                  { label: "Manage My Account",link:"/account", Icon: <AccountIcon />,active :activePage==="account" },
                  { label: "My Order",  Icon: <OrdersIcon /> ,active :activePage==="orders"},
                  { label: "My Reviews",  Icon: <RatingIcon />,active :activePage==="reviews" },
                  { label: "Logout",  Icon: <LogoutIcon />, handleClick:handleLogout },
                ]}
              />
            </>
           }
            </div>
          </div>
        </div>
      </nav>

      {/* BOTTOM NAVBAR (only small screens) */}
      {authContext.data.authToken && <div className="d-flex position-fixed z-2 floating-bottom-navbar mx-auto justify-content-center bottom-0 m-2 p-2 d-sm-none">
      <div className="header-right gap-4 icons-container align-items-center d-flex">
          <HeaderMenuItemIcon Icon={FavoriteIcon} count_label={favProducts.length} color="light" isBottomNav={true} link="/favorites" />
          <HeaderMenuItemIcon Icon={CartIcon} count_label={products.length} color="light" isBottomNav={true} link="/cart" />
          <HeaderMenuItemIcon isSearchItem={true} setFloatingInput={setFloatingInput} />
       <HeaderMenuItemIcon
            isDropMenu={true}
            Icon={AccountIcon}
            color="light"
            dropMenuItems={[
              { label: "Manage My Account",link:"/account", Icon: <AccountIcon />,active :activePage==="account" },
              { label: "My Order",  Icon: <OrdersIcon />,active :activePage==="orders" },
              { label: "My Reviews",  Icon: <RatingIcon />,active :activePage==="reviews" },
              { label: "Logout",  Icon: <LogoutIcon />,handleClick:handleLogout },
            ]}
          />
        </div>
      </div>}

      {/* FLOATING SEARCH INPUT */}
      <HeaderSearchInput handleClick={handleClick} ref={headerSearchContainerRef} showFloatingInput={showFloatingInput} />
    </>
  );
};


