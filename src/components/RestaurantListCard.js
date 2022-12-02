import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RestaurantListCard(props,{route}) {
let cuisineName="";
const navigate=useNavigate();

// let cuisineArray=props.restaurant.cuisine;
  const cuisine=
    {
      'NI':'North Indian, ',
      'SI':'South Indian, ',   
      'CHN':'Chinese, ',
      'SF':'Street Food, ',
    };
function goToRestaurantPage(restaurant)
{
  navigate(`/restaurant/${restaurant.code}`,{state:{name:restaurant.name,overview:restaurant.overview,contact:restaurant.contact,address:restaurant.address,cuisine:restaurant.cuisine,image:restaurant.image}});
}

  return (
  
    // <div style={{cursor:"pointer"}}  onClick={()=>{navigation.navigate(`/restaurant/${props.restaurant.code}`,{resName:props.restaurant.name})}}>
     <div style={{cursor:"pointer"}}  onClick={()=>goToRestaurantPage(props.restaurant)}>
      <Card key={props.restaurant.code}>
        <Card.Body>
          <Row>
            <Col lg={3}>
            <div className="imageRestaurant">
              <Card.Img className="imgSize" src={props.restaurant.image} />
            </div>
            </Col>
            <Col lg={9}>
              <Card.Title>{props.restaurant.name}</Card.Title>
              <Card.Text> {props.restaurant.address}</Card.Text>
            </Col>
          </Row>
          <div className="mt15">

          <Row>
            <Col lg={3}>
            <Card.Title>Cuisine Type</Card.Title>
            <Card.Title>Cost For Two</Card.Title>

            </Col>
            <Col lg={9}>
            
              <Card.Text>
              {(props.restaurant.cuisine).map((item,index)=>(
              cuisineName=cuisine[item]
              ))}
            </Card.Text>
            
              <Card.Text> {props.restaurant.cost}</Card.Text>
            </Col>

          </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  // function getCuisineType(item,index)
  // { 
  //   cuisineName+=cuisine[item];
  //   console.log("cuisine array" +cuisineName);

  //   return cuisineName+ " ";
  // }
}
