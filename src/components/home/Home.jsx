import React from 'react'
import Header from '../includes/header/Header'
import HeroSection from './heroSection/HeroSection'
import FlashSales from './flashSales/FlashSales'
import CategorySection from './categorySection/CategorySection'
import BestSelling from './bestSelling/BestSelling'
import ExploreProducts from './exploreProducts/ExploreProducts'
import BannerAdd from './bannerAdd/BannerAdd'
import NewArrival from './newArrival/NewArrival'

const Home = () => {
  return (
    <div className=''>
      <Header/>
      <HeroSection/>
      <FlashSales/>
      <CategorySection/>
      <BestSelling/>
      <BannerAdd/>
      <ExploreProducts/>
      <NewArrival/>
   
    </div>
  )
}

export default Home
