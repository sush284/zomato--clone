/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../index.css";
import { Typeahead } from "react-bootstrap-typeahead";
import { Row, Col } from "react-bootstrap";
import Navigation from "./Navigation.js";
import LocationTypeahead from "./LocationTypeahead.js";
import { basePath,restaurant } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function ImageContainer() {
 
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRestaurant.length > 0) {
      console.log("Restaurant changed");

      const restaurantCode = selectedRestaurant[0].code;
      navigate(`/restaurant/${restaurantCode}`);
    }
  },[selectedRestaurant]);


  return (
    <div className="backgroundImage">
      <Navigation />
      <Row className="justify-content-lg-center">
      <Col lg={12} className="text-center">
      <div style={{color:"white", marginTop:"0px",}}>
      <h1 className="brandLogo"> e!</h1>
        <h1 >Find best restaurants, cafes' and bars</h1>
        </div>
      </Col>
        <Col lg={4} >
        <div className="locationTypeahead">

        <LocationTypeahead
          callRestaurants={callRestaurants}/>
        </div>
          
        </Col>
        <Col lg={4}>
          <Typeahead
            className="mt-100"
          
            selected={selectedRestaurant}
            onChange={setSelectedRestaurant}
            id="restaurants"
            options={filteredRestaurants}
            labelKey="name"
            placeholder="Enter preferred restaurant name..."
            // disabled={selectedLocation.length === 0}
          ></Typeahead>
        </Col>
      </Row>
    </div>
  );

  function callRestaurants(selectedLocation)
  {
    const URL=`${basePath}${restaurant.getRestaurants}`
    axios.get(`${URL}?location_code=${selectedLocation[0].code}`).then((res)=>{
        // console.log(res);
        setFilteredRestaurants(res?.data?.data?.restaurants);
       });
}
}
export default ImageContainer;
