import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
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

// Debounce function to optimize filter changes
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const Products = () => {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ priority: null, catValue: null });
  const [productsData, setProductsData] = useState([]); 
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

  const handleAddToCart = (id) => AddToCart(id);
  const handleFavoriteToggle = (id, title, img, price, rating) => FavoriteToggle(id, title, img, price, rating);

  const getProductCategories = useCallback(() => {
    getCategories()
      .then((res) => setCatData(res.data))
      .catch(handleApiError);
  }, []);

  // Optimized to avoid unnecessary duplicate filtering
  const updateProductData = (prevData, newData) => {
    const combinedData = [...prevData, ...newData];
    const uniqueData = Array.from(new Set(combinedData.map((product) => product.id)))
      .map((id) => combinedData.find((product) => product.id === id));
    return uniqueData;
  };

  // Fetch products API
  const fetchProducts = useCallback(() => {
    if (filters.priority === null) return;

    setLoading(true);

    if (offset === 0) {
      setProductsData([]);
    }
const cat_value = filters.catValue === "all" ? null : filters.catValue
    getFlashProducts(offset, null, null, filters.priority, cat_value)
      .then((res) => {
        if (res.data.length > 0) {
          setProductsData((prev) => updateProductData(prev, res.data));
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

  // Handle category change
  const handleOptionClick = useCallback(
    debounce((cat_id) => {
      setProductsData([]);
      setReachedEnd(false);
      setOffset(0);
      const selectedCategory = cat_id === "all" ? "All Products" : catData.find((cat) => cat.id === cat_id)?.name;
      setFilters((prev) => ({
        ...prev,
        catValue: cat_id === "all" ? null : cat_id,
        priority: -1,
      }));
      setCategoryHeading(selectedCategory || "All Products");
      navigate(`/products?cat=${cat_id}`);
    }, 500),
    [catData, navigate]
  );

  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

  useEffect(() => {
    fetchProducts();
  }, [filters, offset, fetchProducts]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("cat");

    if (categoryFromQuery) {
      const selectedCategory = categoryFromQuery === "all" ? "All Products" : catData.find((cat) => cat.id === categoryFromQuery)?.name;
      setCategoryHeading(selectedCategory || "All Products");
      setFilters((prev) => ({
        ...prev,
        catValue: categoryFromQuery === "all" ? "all" : categoryFromQuery,
        priority: -1,
      }));
    }
  }, [location.search, catData]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !reachedEnd) {
          setOffset((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    const loadMoreElement = document.getElementById("loadMoreTrigger");
    if (loadMoreElement) observer.observe(loadMoreElement);

    return () => {
      if (loadMoreElement) observer.unobserve(loadMoreElement);
    };
  }, [loading, reachedEnd]);

  const handleSortClick = (sortValue) => {
    const sortedData = [...productsData].sort((a, b) => 
      sortValue === "desc" ? b.final_price - a.final_price : a.final_price - b.final_price
    );
    setProductsData(sortedData);
  };

  const handleViewAllClick = () => {
    setProductsData([]);
    setReachedEnd(false);
    setOffset(0);
    navigate("/products?cat=all");
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header />

      <div className="custom-container mx-auto">
        <div className="text-muted mt-5">
          <Link to="/">Home</Link> / <span className="text-dark fw-medium">Products</span>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <CustomHeader smallHeading="Category" largeHeading={categoryHeading} />

          <div className="text-center body d-flex gap-3 my-2 my-sm-0">
            <select
              name="cat-filter"
              value={filters.catValue || "filter_cat"}
              onChange={(e) => handleOptionClick(e.target.value)}
              className="form-select shadow-none form-select-md product-view-select-filter"
            >
                <option disabled value="filter_cat">Filter Category</option>
              <option value="all">All</option>
              {catData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select onChange={(e) => handleSortClick(e.target.value)} className="form-select product-view-select-filter shadow-none form-select-md">
              <option selected disabled>
                Filter Price
              </option>
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div>
        </div>

        <div className="row my-4">
          {productsData && productsData.length > 0 ? (
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
            <div className="justify-content-center flex-column align-items-center">
              {!loading ? (
                <div className="d-flex justify-content-center my-5 flex-column align-items-center gap-4">
                  <h4 className="text-center">No Products available for this category!</h4>
                  <div
                    onClick={handleViewAllClick}
                    className="btn btn-transparent border rounded-2 col-12 col-sm-5 p-3 border-1 border-dark my-2"
                  >
                    View All Products
                  </div>
                </div>
              ) : (
                <SkeletonComponent count={4} showTiles={true} height={150} />
              )}
            </div>
          )}
        </div>

        <div id="loadMoreTrigger" className="d-flex justify-content-center my-5">
          {loading && <SpinnerLoader />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
