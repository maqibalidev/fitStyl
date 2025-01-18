import React from "react";
import demo from "../../assets/images/side_img.png";
import "./about.css";
import { AboutItem, Footer, Header, TeamSection } from "../includes/imports";

const  About = () => {
  return (
<div className="d-flex flex-column justify-content-between">
      <Header  activePage="about"/>

      <div className="position-relative">
        <div className="custom-container mx-auto">
          <div className="about-banner-sec row">
            <div className="col-12 col-md-6 align-items-center py-5 left d-flex flex-column justify-content-center">
              <h1 className="text-start w-100">Our Story</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                tempore dolorum laborum ipsam omnis, similique fugiat. Atque velit
                ut similique alias nobis, officia culpa dignissimos aperiam? Minima provident numquam hic?
              </p>
              <img src={demo} height={500} className="col-12 col-md-5 position-absolute end-0 top-0 right" alt="About Us" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis aut optio quas? Possimus, odit! At optio tempore iste velit!
              </p>
            </div>
          </div>

          <div className="d-flex gap-4 my-5 flex-column flex-sm-row justify-content-center align-items-center flex-wrap">
            <AboutItem isBordered={true} />
            <AboutItem isBordered={true} />
            <AboutItem isBordered={true} />
            <AboutItem isBordered={true} />
          </div>

          <TeamSection />
          <div className="d-flex gap-4 my-5 justify-content-center flex-column flex-sm-row align-items-center">
            <AboutItem />
            <AboutItem />
            <AboutItem />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  
  );
};

  

    export default About;