import React, { useState } from "react";
import '../components/RestaurantDetailsPage.css'
import {
  Button,
  Tabs,
  Tab,
  Container,
  Carousel,
  CarouselItem,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import PopupCuisineList from "./PopupCuisineList.jsx";
export default function RestaurantDetailsPage() {
  const location=useLocation();
const details=location.state;
const [popup, setPopupValue]=useState(false);

const cuisine=
{
  'NI':'North Indian, ',
  'SI':'South Indian, ',   
  'CHN':'Chinese, ',
  'SF':'Street Food, ',
};

function handleClickOpenPopup(popup)
{
  setPopupValue(true);
}
return (
    <Container>
      <Carousel>
        <CarouselItem>
          <img
            src={details.image}
            alt="Not available"
            height={400}
            width={"100%"}
          />
          <Carousel.Caption>
        <h2>{details.name}</h2>
      </Carousel.Caption>
      
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/dinner.jpg"
            alt="No available"
            height={400}
            width={"100%"}
          />
          <Carousel.Caption>
        <h2>{details.name}</h2>
      </Carousel.Caption>
      
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/nightlife.jpg"
            alt="No available"
            height={400}
            width={"100%"}
          />
          <Carousel.Caption>
        <h2>{details.name}</h2>
      </Carousel.Caption>
      
        </CarouselItem>
      </Carousel>

      <div className="orderButtonArea position-relative">
      <Button variant="danger" onClick={handleClickOpenPopup}>Place your Order</Button>
      <PopupCuisineList details={details} popup={popup} setPopupValue={setPopupValue}/>
      </div>
      <Tabs defaultActiveKey={"overview"}>
        <Tab title="Overview" eventKey="overview">
         <b>About this Place</b><br/>
          <h6>{details.name}</h6>
         <b>Serves</b><br/>

          <h6>{details.overview}</h6>

          <b>Cuisine Type</b><br/>
          
          {(details.cuisine).map((item)=>(
              cuisine[item]
              ))}
        </Tab>
        <Tab title="Contact" eventKey="contact">
          <b>Mobile Number<br/></b>
          <h6>
          {details.contact}</h6>
          
            <b>Address</b><br/>          
            <h6>{details.address}</h6>
        </Tab>
      </Tabs>
    </Container>
  );

}
