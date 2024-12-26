import React, { useEffect, useState } from 'react'
import Header from '../includes/header/Header'
import HeroSection from './heroSection/HeroSection'
import FlashSales from './flashSales/FlashSales'
import CategorySection from './categorySection/CategorySection'
import BestSelling from './bestSelling/BestSelling'
import ExploreProducts from './exploreProducts/ExploreProducts'
import BannerAdd from './bannerAdd/BannerAdd'
import NewArrival from './newArrival/NewArrival'
import AboutSection from './about/AboutSection'
import Footer from '../includes/footer/Footer'
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
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className=''>
        {isVisible && (
        <button
          onClick={scrollToTop}
          className="rounded-circle border-0 bg-color-orange lh-0 end-0 m-3 p-2 scroll-top-btn position-fixed bottom-0 right-0 d-flex align-items-center justify-content-center z-2 btn-red"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFFFFF"
          >
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
        </button>
      )}
      <Header/>
      <HeroSection/>
      <FlashSales/>
      <CategorySection/>
      <BestSelling/>
      <BannerAdd/>
      <ExploreProducts/>
      <NewArrival/>
      <AboutSection/>
   <Footer/>
    </div>
  )
}

export default Home
