 import {Card,Button} from 'react-bootstrap';

function FoodCardsMain(props) {
    const [cuisine,setCuisine]=props.cuisine;
  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.cuisine}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FoodCardsMain;