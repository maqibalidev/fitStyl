import React, { Suspense, useState, useEffect } from "react";
import {UpArrowIcon,Footer,Loader, Header ,HeroSection,FlashSales,CategorySection,BestSelling,ExploreProducts,BannerAdd,NewArrival,AboutSection} from "../includes/imports";
import "./home.css"

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    console.log("use effect calling");
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
         <UpArrowIcon/>
        </button>
      )}
      <Header />
      <Suspense
        fallback={<Loader/>}>
        <HeroSection />
        <FlashSales />
        <CategorySection />
        <BestSelling />
        <BannerAdd />
        <ExploreProducts />
        <NewArrival />
        <AboutSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
