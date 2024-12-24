import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { CartIcon, FavoriteIcon } from "../../../assets/icons/icons";
const Header = () => {
  const navLinks = [
    {
      label: "Home",
      url: "/",
      active: true,
    },
    {
      label: "Contact",
      url: "/",
      active: false,
    },
    {
      label: "About",
      url: "/",
      active: false,
    },
    {
      label: "Sign Up",
      url: "/",
      active: false,
    },
  ];
  return (
    <nav class="navbar navbar-expand-lg py-4 border border-bottom-3 border-muted">
      <div class="container-fluid custom-container px-0">
{/* ///////  LOGO /////// */}

        <Link class="navbar-brand" to="#">
          Navbar
        </Link>

{/* //// HEADER MENU ICON BUTTON //// */}

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
{/* //////////////////////----------HEADER LINKS--------- ////////////////////////////// */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-4">
            {navLinks.map((item, key) => (
              <li key={key} class="nav-item header-links mx-2">
                <Link
                  class={`nav-link header-link ${
                    item.active ? "active position-relative" : ""
                  } p-0`}
                  aria-current="page"
                  to={item.url}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

{/* //////////////////////----------HEADER LEFT--------- ////////////////////////////// */}

          <div className="header-right d-flex gap-4 align-items-center">
            <form class="d-flex bg-light rounded-1 px-2 ">
              <input
                class="header-search-input form-control py-2 me-2 outline-none shadow-none border-0 bg-transparent"
                placeholder="What are you looking for?"
                aria-label="Search"
              />
              <button className="bg-transparent border-0 d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </form>

            <Link className="text-dark">
              <FavoriteIcon />
            </Link>

            <Link className="text-dark">
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
