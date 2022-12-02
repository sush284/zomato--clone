// import "../../src/App.css";
import QuickSearchBoxes from "./QuickSearchBoxes.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Container} from 'react-bootstrap';

function QuickSearchContainer(props) {
  return (
  <Container>
    <Row>
      <Col lg={12}>
        <h4>Quick Search</h4>
        <h6>Discover restaurants by type or cuisine
        </h6>
      </Col>
    </Row>
    <Row>
      <Col lg={12}>
        <QuickSearchBoxes/>
      </Col>
    </Row>
  </Container>
  );
}

export default QuickSearchContainer;
