import React, { Suspense, useState, useEffect } from "react";
import {
  UpArrowIcon,
  Footer,
  Loader,
  Header,
  HeroSection,
  FlashSales,
  CategorySection,
  BestSelling,
  ExploreProducts,
  BannerAdd,
  NewArrival,
  AboutSection,
} from "../includes/imports";
import "./home.css";
import {
  getBanner,
  getCategories,
  getFlashProducts,
} from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flashProduct, setFlashProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [exploreProduct, setExploreProduct] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [bannerAddData, setBannerAddData] = useState([]);
  const [newArrivalAddData, setNewArrivalAddData] = useState([]);
  const toggleVisibility = () => {
    if (window.scrollY > window.screen.height * 3) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getFlashProducts()
      .then((data) => {
        setFlashProducts(data.data);

        getCategories()
          .then((data) => {
            setCategoryData(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });

        getFlashProducts()
          .then((data) => {
            setBestSellingProducts(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });

        getFlashProducts(null,100,null)
          .then((data) => {
            setExploreProduct(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });

        getBanner(1)
          .then((data) => {
            setBannerData(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });

        getBanner(2)
          .then((data) => {
            setBannerAddData(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });

        getBanner(3)
          .then((data) => {
            setNewArrivalAddData(data.data);
          })
          .catch((error) => {
            handleApiError(error);
          });
      })

      .catch((error) => {
        handleApiError(error);
      });

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="rounded-circle border-0 bg-color-orange lh-0 end-0 m-3 p-2 scroll-top-btn position-fixed bottom-0 right-0 d-flex align-items-center justify-content-center z-2 btn-red"
        >
          <UpArrowIcon />
        </button>
      )}
      <Header activePage="home"/>
        <Suspense fallback={<div className="relative vh-100"><Loader /></div>}>
        <HeroSection data={bannerData} categories={categoryData}/>
        <FlashSales data={flashProduct}/>
        <CategorySection data={categoryData}/>
        <BestSelling data={bestSellingProducts}/>
        <BannerAdd data={bannerAddData}/>
        <ExploreProducts data={exploreProduct}/>
        <NewArrival data={newArrivalAddData}/>
        <AboutSection/>
        </Suspense>
      <Footer/>
    </div>
  );
};

export default Home;
