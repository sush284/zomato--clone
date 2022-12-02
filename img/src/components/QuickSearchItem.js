import React from 'react'
import {Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function QuickSearchItem(props) {
  const navigate=useNavigate();
  return (
    <div onClick={()=>goToListPage(props.code)}>
      <Card style={{ width: '21rem' }}>
      <Card.Img style={{"width": "170px","height": "130px"}} src={props.image} />
      <Card.Body>
        <Card.Title>{props.type}</Card.Title>
        <Card.Text>
         {props.description}
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>
  
  )
  function goToListPage(code)
  {
    console.log("code is "+code);
  navigate(`/restaurant/list/${code}`);
  }

 }
