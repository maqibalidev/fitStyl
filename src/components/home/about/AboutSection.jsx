import React from "react";
import "./about_section.css";
import { AboutIcon1 } from "../../includes/imports";


const AboutItem = React.memo(({ icon: Icon, title, description }) => (
  <div className="about-item d-flex flex-column align-items-center">
    <div className="icon w-auto bg-color-orange text-light rounded-circle d-flex justify-content-center align-items-center">
      <Icon />
    </div>
    <h5 className="mt-4 mb-0">{title}</h5>
    <p className="text-center">{description}</p>
  </div>
));

const AboutSection = () => {

  const aboutData = [
    { id: 1, icon: AboutIcon1, title: "FAST Delivery", description: "Lorem ipsum dolor sit amet." },
    { id: 2, icon: AboutIcon1, title: "Secure Payment", description: "Lorem ipsum dolor sit amet." },
    { id: 3, icon: AboutIcon1, title: "24/7 Support", description: "Lorem ipsum dolor sit amet." },
  ];

  return (
    <div className="custom-container about-sec-container mx-auto d-flex align-items-center mb-4 justify-content-center flex-column flex-sm-row">
      {aboutData.map((item) => (
        <AboutItem key={item.id} icon={item.icon} title={item.title} description={item.description} />
      ))}
    </div>
  );
};

export default AboutSection