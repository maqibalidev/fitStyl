import React from 'react';
import "./new_arrival.css";
import demo1 from '../../../assets/images/demo1.png';
import CustomHeader from '../../customHeader/CustomHeader';
import { Link } from 'react-router-dom';
import NewArrivalItem from './NewArrivalItem';
const NewArrival = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading='Featured' largeHeading='New Arrival' />
      <div className='new-arrival-container d-flex  mt-5'>
        <NewArrivalItem img={demo1} desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit" />
        <div className="d-flex flex-column right">
          <NewArrivalItem img={demo1} showImageRight={true} desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit" />
          <div className="d-flex right">
            <NewArrivalItem img={demo1} desc="Lorem ipsum dolor si" isBottomItem={true} />
            <NewArrivalItem img={demo1} desc="Lorem ipsum dolor si" isBottomItem={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrival
