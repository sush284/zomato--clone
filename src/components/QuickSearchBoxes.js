import React,{useState,useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import QuickSearchItem from "./QuickSearchItem.js";
import axios from 'axios';


export default function QuickSearchBoxes() {
  const [quickSearchlist ,setQuickSearchList]=useState([]);


  useEffect(() => {
    axios.get('http://localhost:9192/getQuickRestaurantFilters').then((res)=>{
    // console.log(res);
    setQuickSearchList(res.data.data);
   }).catch((error)=>{
    console.log(error);
   });
   },[]);
 
  return(
  <Container>
    <Row>
    {
        quickSearchlist.map((searchItem,index)=>
        <Col lg={4} key={index}>
            <QuickSearchItem code={searchItem.code} type={searchItem.timing} description={searchItem.description} image={searchItem.image}/>
            </Col>
        )
    }
       
    </Row>
  </Container>
  );

}
