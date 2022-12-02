import React from "react";
// import {useParams,useNavigate} from 'react-router-dom';
import {
  Button,
  Tabs,
  Tab,
  Container,
  Carousel,
  CarouselItem,
} from "react-bootstrap";
export default function RestaurantDetailsPage() {
  // let {code}=useParams();
  // const navigate=useNavigate();
  return (
    <Container>
      <Carousel>
        <CarouselItem>
          <img
            src="https://edurekawebbucket.s3.ap-south-1.amazonaws.com/img/breakfast.jpg"
            alt="Not available"
            height={400}
            width={"100%"}
          />
          <Carousel.Caption>
        <h2>Restaurant Name</h2>
        <p>Cuisines List</p>
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
        <h2>Restaurant Name</h2>
        <p>Cuisines List</p>
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
        <h2>Restaurant Name</h2>
        <p>Cuisines List</p>
      </Carousel.Caption>
      
        </CarouselItem>
      </Carousel>
      <Tabs defaultActiveKey={"overview"}>
        <Tab title="overview" eventKey="overview">
          <h3>Overview</h3>
        </Tab>
        <Tab title="Contact" eventKey="contact">
          <h3>Details</h3>
        </Tab>

        <Tab title="order" eventKey="order">
          <Button bg={"dark"} className="danger">
            Order Now
          </Button>
        </Tab>
      </Tabs>
    </Container>
  );
  // function goBack()
  // {
  //   navigate('/');
  // }
}
