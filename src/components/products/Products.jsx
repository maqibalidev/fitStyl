import React, { useContext, useEffect, useState, useCallback } from "react";
import { CartContext, CustomButton, CustomHeader, favoriteContext, Loader } from "../includes/imports";
import "./products.css";
import { Footer, Header, Product } from "../includes/imports";
import { getCategories, getFlashProducts } from "../../services/userListingsApi";
import { useFavorites } from "../../hooks/useAddFav";
import { useAddCart } from "../../hooks/useAddCart";
import { handleApiError } from "../../helpers/errorHandler";
import SkeletonComponent from "../skeleton/Skeleton";
import SpinnerLoader from "../includes/SpinnerLoader";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ priority: null, catValue: null });
  const [productsData, setProductsData] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [categoryHeading, setCategoryHeading] = useState("All Products");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { products, addProduct } = useContext(CartContext);
  const { favProducts, addFavProduct, removeFavProduct } = useContext(favoriteContext);
  const [loadingState, setLoadingState] = useState(false);

  const { AddToCart } = useAddCart(products, addProduct);
  const { FavoriteToggle } = useFavorites(favProducts, addFavProduct, removeFavProduct);

  const handleAddToCart = (id) => {
      return  AddToCart(id); 
  
  };
  

  const handleFavoriteToggle = (id, title, img, price, rating) => {
    FavoriteToggle(id, title, img, price, rating);
  };

  // Fetch product categories
  const getProductCategories = () => {
    getCategories()
      .then((res) => {
        setCatData(res.data);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  // Fetch products API
  const fetchProducts = useCallback(() => {
    // Prevent fetching if priority is null or undefined
    if (filters.priority === null) return;

    setLoading(true);

    if (offset === 0) {
      setProductsData([]); // Reset products when offset is 0
    }
    console.log(offset)
    getFlashProducts(offset, null, null, filters.priority, filters.catValue)
      .then((res) => {
        if (res.data.length > 0) {
          setProductsData((prev) => (offset === 0 ? res.data : [...prev, ...res.data]));
        } else {
          setReachedEnd(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        handleApiError(err);
      });
  }, [filters, offset]);

  // Handle category value change
  const handleOptionClick = (cat_id) => {
    setProductsData([]); // Reset products list on filter change
    setReachedEnd(false);
    setOffset(0); // Reset offset

    if (cat_id === "all") {
      setFilters((prev) => ({ ...prev, catValue: null, priority: -1 }));
      setCategoryHeading("All Products");
      navigate(`/products?cat=all`);
    } else {
      const selectedCategory = catData.find((cat) => cat.id === cat_id);
      setFilters((prev) => ({ ...prev, catValue: cat_id, priority: -1 }));
      setCategoryHeading(selectedCategory.name);
      navigate(`/products?cat=${cat_id}`);
    }
  };

const handleViewAllClick = ()=>{
  setProductsData([]); // Reset products list on filter change
  setReachedEnd(false);
  setOffset(0); // Reset offset
  navigate("/products?cat=all")
}

  // Handle query parameter for category
  useEffect(() => {
    console.log(filters.priority)
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("cat");

    if (categoryFromQuery) {
      if (categoryFromQuery === "all") {
        setFilters((prev) => ({ ...prev, priority: -1, catValue: null }));
        setCategoryHeading("All Products");
      } else {
        const selectedCategory = catData.find((cat) => cat.id === categoryFromQuery);
        if (selectedCategory) {
          setFilters((prev) => ({ ...prev, catValue: categoryFromQuery, priority: -1 }));
          setCategoryHeading(selectedCategory.name);
        }
      }
    }
  }, [location.search, catData]);

  // Set priority and category heading based on route parameters
  useEffect(() => {
    if (params.parameters === "flash_sales") {
      setFilters((prev) => ({ ...prev, priority: 1 }));
      setCategoryHeading("Flash Sales");
    } else if (params.parameters === "best_selling") {
      setFilters((prev) => ({ ...prev, priority: 2 }));
      setCategoryHeading("Best Selling Products");
    } else if (params.parameters === "all") {
      setFilters((prev) => ({ ...prev, priority: -1 }));
      setCategoryHeading("All Products");
    }
  }, [params]);

  // Fetch categories on mount
  useEffect(() => {
    getProductCategories();
  }, []);

  // Fetch products whenever filters or offset changes
  useEffect(() => {
    setLoading(true)
    fetchProducts();
  }, [filters, offset, fetchProducts]);

  const handleLoadMoreClick = () => {
    setOffset((prev) => (prev + 1));
  };

  const handleSortClick = (sortValue) => {
    let sortedData;
    
    const copiedData = [...productsData];
  
    if (sortValue === "desc") {
      sortedData = copiedData.sort((a, b) => b.final_price - a.final_price);
    } else {
      sortedData = copiedData.sort((a, b) => a.final_price - b.final_price);
    }
  
    setProductsData(sortedData);
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header />

      <div className="custom-container mx-auto">
        <div className="text-muted mt-5">
          Home / <span className="text-dark fw-medium">Products</span>
        </div>
        <div className="d-flex flex-column flex-sm-row  justify-content-between align-items-center">
          <CustomHeader smallHeading="Category" largeHeading={categoryHeading} />

          <div className="text-center body d-flex gap-3 my-2 my-sm-0">
            {/* Category Filter */}
            <select
              name="cat-filter"
              value={filters.catValue || "all"}
              onChange={(e) => handleOptionClick(e.target.value)}
              className="form-select shadow-none form-select-md product-view-select-filter"
              aria-label=".form-select-lg example"
            >
              <option value="all">All</option>
              {catData &&
                catData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>

            {/* Price Filter */}
            <select onChange={(e) => handleSortClick(e.target.value)} className="form-select product-view-select-filter shadow-none form-select-md" aria-label=".form-select-lg example">
              <option selected disabled>
                Filter Price
              </option>
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div>
        </div>
     
        <div className="row my-4 ">
          {/* Products Grid */}
          
            {productsData && productsData.length > 0  ? (
            productsData.map((item, key) => (
              <div className="col-12 col-sm-4 col-lg-3" key={key}>
                <Product
                  id={item.id}
                  img={item?.images[0] || ""}
                  price={item.final_price}
                  rating={item.rating}
                  offSale={item.off_sale}
                  title={item.name}
                  loadingState={loadingState}
                  isNew={true}
                  exist={!!favProducts.find((product) => product.id === item.id)}
                  existInCart={!!products.find((product) => product.id === item.id)}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleFavoriteToggle}
                />
              </div>
            ))
          ) : (
           <>
           {!loading ? <div className="d-flex justify-content-center my-5 flex-column align-items-center gap-4">
            <h4 className="text-center">No Products available for this category!</h4>
            <div
              onClick={handleViewAllClick}
              className="btn btn-transparent border rounded-2 col-12 col-sm-5 p-3 border-1 border-dark my-2"
            >
              View All Products
            </div>
          </div>:
          <div className="d-flex justify-content-center w-100 row mx-auto">
          <SkeletonComponent count={4} showTiles={true} height={150} />
        </div>
          }
           </>
          )}
        </div>

        {/* Load More Button */}
        {!reachedEnd && (
          <div className="d-flex justify-content-center my-5">
            {!loading ? (
              <button
                onClick={handleLoadMoreClick}
                className="px-4 py-2 bg-color-orange text-light border-0 rounded-1"
              >
                Show More
              </button>
            ) : (
              <SpinnerLoader />
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
