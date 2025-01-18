import React from "react";
import {CustomHeader,NewArrivalItem} from "../../includes/imports"
import { newArrivalData } from "../../../assets/data";
import "./new_arrival.css";


const NewArrival = ({data}) => {

  return (
    <div className="custom-container mx-auto new-arrival-outer-container">
      <div className="px-2 px-sm-0">
        <CustomHeader smallHeading="Featured" largeHeading="New Arrival" />
      </div>

   {data && data.length === 4 &&    <div className="new-arrival-container d-flex flex-column mt-5 flex-md-row">
        
        <NewArrivalItem
          img={data[0].image_url}
          desc={data[0].banner_desc}
        />
        <div className="d-flex flex-column right">
          <NewArrivalItem
                 img={data[1].image_url}
                 desc={data[1].banner_desc}
            showImageRight={true}
            
          />
          <div className="d-flex right flex-column flex-sm-row">
            <NewArrivalItem
                 img={data[2].image_url}
                 desc={data[2].banner_desc}
              isBottomItem={true}
            />
            <NewArrivalItem
                 img={data[3].image_url}
                 desc={data[3].banner_desc}
              isBottomItem={true}
            />
          </div>
        </div>
      </div>}
    </div>
  );
};

export default NewArrival;
