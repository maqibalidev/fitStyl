import React from "react";
import { Link } from "react-router-dom";

const HeaderMenuItemIcon = ({
  Icon,
  count_label = 0,
  isDropMenu = false,
  dropMenuItems = [],
  color = "dark",
  isSearchItem = false,
  setFloatingInput,
  link = "#",
  isBottomNav=false,

}) => {

  const renderSearchIcon = () => (
    <div className="d-flex rounded-circle">
      <button
        onClick={() => setFloatingInput(true)}
        className="bg-transparent text-light header-search-icon-btn border-0 d-flex align-items-center justify-content-center px-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );

  // Render for the dropdown menu items
  const renderDropdownMenuItems = () => {
    return dropMenuItems.map((item, key) => (
      <li  onClick={item.handleClick} key={key}>
        <Link
          className={`dropdown-item ${item.active ? "dropdown-active" : ""} d-flex align-items-center`}
          to={item?.link || "/"}
        >
          {item.Icon}
          <span className="ms-2">{item.label}</span>
        </Link>
      </li>
    ));
  };

  // Render the icon with or without a count label
  const renderIconButton = () => (
    <Link
      to={link}
      className={`text-${color} header-icon-item position-relative d-flex align-items-center justify-content-center rounded-circle`}
    >
      {count_label > 0 && (
        <div className={`header-item-label position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center ${isBottomNav && "bg-light"}  ${color==="light" && "color-primary"}`}>
          {count_label}
        </div>
      )}
      <Icon />
    </Link>
  );

  // Main render logic
  return (
    <>
      {isDropMenu ? (
        <div className="dropdown">
          <Link
          
            to={link}
            className={`text-${color} header-icon-item header-icon-account-item rounded-circle d-flex  align-items-center justify-content-center`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Icon />
          </Link>
          <ul className="dropdown-menu header-dropdown-menu end-0 py-0 border-0">
            {renderDropdownMenuItems()}
          </ul>
        </div>
      ) : isSearchItem ? (
        renderSearchIcon()
      ) : (
        renderIconButton()
      )}
    </>
  );
};

export default HeaderMenuItemIcon;
