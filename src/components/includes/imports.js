// src/imports.js

import { lazy } from "react";

// Icons
export {
  CartIcon,
  FavoriteIcon,
  ArrowIcon,
  ArrowLEFT,
  ArrowRight,
  RatingIcon,
  EyeIcon,
  CategoryIcon1,
  AboutIcon1,
  SendIcon,
  SocialMediaIcon1,
  SocialMediaIcon2,
  SocialMediaIcon3,
  SocialMediaIcon4,
  AccountIcon,
  LogoutIcon,
  OrdersIcon,
  CancelIcon,
  AddIcon,
  SubtractIcon,
  GoogleIcon,
  CallIcon,
  MailIcon,
  UpArrowIcon,
  SadEmoji,
  HappyEmoji
} from "../../assets/icons/icons";

// Contexts

const About = lazy(() => import("../aboutPage/About"));
const Contact = lazy(() => import("../contact/Contact"));
const Cart = lazy(() => import("../cart/Cart"));
const AboutSection = lazy(() => import("../home/about/AboutSection"));
const BannerAdd = lazy(() => import("../home/bannerAdd/BannerAdd"));
const BestSelling = lazy(() => import("../home/bestSelling/BestSelling"));
const CategorySection = lazy(() => import("../home/categorySection/CategorySection"));
const ExploreProducts = lazy(() => import("../home/exploreProducts/ExploreProducts"));
const FlashSales = lazy(() => import("../home/flashSales/FlashSales"));
const NewArrival = lazy(() => import("../home/newArrival/NewArrival"));
const HeroSection = lazy(() => import("../home/heroSection/HeroSection"));
export { About ,Cart,Contact,AboutSection,BannerAdd,BestSelling,CategorySection,ExploreProducts,FlashSales,NewArrival,HeroSection}
export { AboutItem } from "../aboutPage/AboutItem";
export { TeamSection } from "../aboutPage/TeamSection";
export { Header } from "./header/Header";
export { Footer } from "./footer/Footer";
export { CustomHeader } from "../customHeader/CustomHeader";
export { CartItem } from "../cart/CartItem"
export { CustomButton } from "../customButton/CustomButton"
export { Product } from "../../components/product/Product"
export { Image } from "../../components/customImage/Image"
export { Loader } from "../../components/includes/Loader"
export { NewArrivalItem } from "../../components/home/newArrival/NewArrivalItem"
export { CartContext,CartProvider } from "../../contexts/cartContext";
export {AuthContext,AuthProvider } from "../../contexts/AuthContext";
export { favoriteContext,FavoriteProvider } from "../../contexts/favoritesContext";
export {loginSchema,registerSchema} from "../../schema/schemas"