import React from 'react';
import "./new_arrival.css";
import demo1 from '../../../assets/images/demo1.png';
import CustomHeader from '../../customHeader/CustomHeader';
import NewArrivalItem from './NewArrivalItem';
import { newArrivalData } from '../../../assets/data';
const NewArrival = () => {
  const newArrival = newArrivalData; 
  return (
    <div className='custom-container mx-auto new-arrival-outer-container'>
  <div className='px-2 px-sm-0'> <CustomHeader smallHeading='Featured' largeHeading='New Arrival' /></div>
      <div className='new-arrival-container d-flex  mt-5 flex-column flex-md-row'>
        <NewArrivalItem img={newArrival.banner1.img} desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit" />
        <div className="d-flex flex-column right">
          <NewArrivalItem img={newArrival.banner2.img} showImageRight={true} desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit" />
          <div className="d-flex right flex-column flex-sm-row">
            <NewArrivalItem img={newArrival.banner3.img} desc="Lorem ipsum dolor si" isBottomItem={true} />
            <NewArrivalItem img={newArrival.banner4.img} desc="Lorem ipsum dolor si" isBottomItem={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrival
