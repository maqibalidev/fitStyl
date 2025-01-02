import React, { forwardRef } from 'react'

const HeaderSearchInput = forwardRef((props,ref)=>(
    <div
    id="header-search-container"
    ref={ref}
    onClick={props.handleClick}
    className={`header-search-container ${
      props.showFloatingInput && "floating-search-active"
    } position-fixed top-0 left-0 w-100 h-100 z-3 align-items-center justify-content-center`}
  >
<form
id="header-search-form"
className="d-flex bg-light rounded-1 px-2 "
>
<input
className="header-search-input form-control py-2 me-2 outline-none shadow-none border-0 bg-transparent"
placeholder="What are you looking for?"
aria-label="Search"
/>
<button className="bg-transparent border-0 d-flex align-items-center">
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
</form>
</div>
));


export default HeaderSearchInput
