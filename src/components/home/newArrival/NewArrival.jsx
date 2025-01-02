import React from "react";
import {CustomHeader,NewArrivalItem} from "../../includes/imports"
import { newArrivalData } from "../../../assets/data";
import "./new_arrival.css";

const NewArrival = () => {
  const { banner1, banner2, banner3, banner4 } = newArrivalData;

  return (
    <div className="custom-container mx-auto new-arrival-outer-container">
      <div className="px-2 px-sm-0">
        <CustomHeader smallHeading="Featured" largeHeading="New Arrival" />
      </div>

      <div className="new-arrival-container d-flex flex-column mt-5 flex-md-row">
        <NewArrivalItem
          img={banner1.img}
          desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />
        <div className="d-flex flex-column right">
          <NewArrivalItem
            img={banner2.img}
            showImageRight={true}
            desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
          />
          <div className="d-flex right flex-column flex-sm-row">
            <NewArrivalItem
              img={banner3.img}
              desc="Lorem ipsum dolor sit amet"
              isBottomItem={true}
            />
            <NewArrivalItem
              img={banner4.img}
              desc="Lorem ipsum dolor sit amet"
              isBottomItem={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
