/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Alert,
  Pagination,
} from "react-bootstrap";
import RestaurantListCard from "./RestaurantListCard.js";
import LocationTypeahead from "./LocationTypeahead.js";
import Navigation from "./Navigation.js";

import { useParams } from "react-router-dom";

export default function RestaurantList() {
  let { timingFilter } = useParams();
  const limit = 3;
  const [totalPages, setTotalPages] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCuisineArr, setSelectedCuisineArr] = useState([]);
  const [selectedCost, setSelectedCost] = useState([]);
  // const [sortCostFilter, setSortCostFilter] = useState([]);
  const [filterCode,setFilterCode]=useState('');

  const [payload, setPayload] = useState({
    timing_codes: timingFilter,
  });
  const timing = {
    BRF: "Breakfast",
    LCH: "Lunch",
    DNR: "Dinner",
    NGT: "Nightlife",
    SKS: "Snacks",
    DRK: "Drinks",
  };

  const [typesOfCuisine] = useState([
    {
      name: "North Indian",
      code: "NI",
    },
    {
      name: "South Indian",
      code: "SI",
    },
    {
      name: "Chinese",
      code: "CHIN",
    },
    {
      name: "Street Food",
      code: "SF",
    },
  ]);

  const [costFilters] = useState([
    {
      name: "0 - 100",
      code: '{"from": 0,"to":100 }',
    },
    {
      name: "100 - 500",
      code: '{"from": 100,"to":500 }',
    },
    {
      name: "500 - 1000",
      code: '{"from": 500,"to":1000 }',
    },
    {
      name: "1000 - 1500",
      code: '{"from": 1000,"to":1500 }',
    },
    {
      name: "1500 +",
      code: '{"from": 1500,"to":2000 }',
    },
  ]);

  const [costRangeFilters] = useState([
    {
      name: "High to Low",
      code:"DSC",
    },
    {
      name: "Low to High",
      code:"ASC",
    },
  ]);



  useEffect(() => {
    getRestaurants(payload);
  }, [payload, activePage]);

  useEffect(() => {
    setPayload({ ...payload, selectedCuisine: selectedCuisineArr });
  }, [selectedCuisineArr]);

  useEffect(() => {
    setPayload({ ...payload, selectedCostRange: selectedCost });
  }, [selectedCost]);


  useEffect(() => {
    setPayload({ ...payload ,sortFilterCode:filterCode});
  }, [filterCode]);


  return (
    <Container>
      <Navigation page="restaurantList"/>
      <Row>
        <h5>Restaurants which serve {timing[timingFilter]}</h5>
      </Row>

      <Row>
        <Col lg={3} className="p30">
          <h5>Locations</h5>
          <LocationTypeahead callRestaurants={getLocationPayload} />
          <h5 className="mt15">Cuisines</h5>
          <Form>
            {typesOfCuisine.map((item, index) => (
              <Form.Check
                key={`cuisine${index}`}
                type="checkbox"
                id={index + 1}
                value={item.code}
                label={item.name}
                onClick={handleCuisineCheck}
              />
            ))}
          </Form>
          <h5 className="mt15">Cost (in Rupees)</h5>
          <Form>
            {costFilters.map((item, index) => (
              <Form.Check
                key={`cost${index}`}
                type="radio"
                name={"costFilters"}
                id={index + 1}
                value={item.code}
                label={item.name}
                onClick={handleCostCheck}
              />
            ))}
          </Form>
          <h5 className="mt15">Cost Range</h5>
          <Form>
            {costRangeFilters.map((item, index) => (
              <Form.Check
                key={`${index}`}
                type="radio"
                name={"costRangeFilters"}
                id={index + 1}
                value={item.code}
                label={item.name}
                onClick={handleCostRangeFilterCheck}
              />
            ))}
          </Form>
        </Col>
        <Col lg={9}>
          {filteredRestaurants.length === 0 && (
            <Alert key="error" variant="danger">
              Sorry no records found for it.
            </Alert>
          )}

          {filteredRestaurants.length > 0 &&
            filteredRestaurants.map((filteredRestaurants, index) => (
              <div className="mb-30">
                <RestaurantListCard
                  timing_code={timing[timingFilter]}
                  cuisineType={selectedCuisineArr}
                  key={`card${index}`}
                  restaurant={filteredRestaurants}
                />
              </div>
            ))}
          <Pagination>
            {
              totalPages.map((item, index) =>
                <Pagination.Item key={index} active={activePage === item+1} onClick={() => updateActivePage(item + 1)}>
                  {item+1}
                </Pagination.Item>)
            }
          </Pagination>
        </Col>
      </Row>
    </Container>
  );


  function getRestaurants(locationSelected) {
    const defaultPayload = {
      'limit': limit,
      'page': activePage,
    };
    const payloadToSend = {
      params: { ...defaultPayload, ...payload },
    };
    axios
      .get("http://localhost:9192/getRestaurants", payloadToSend)
      .then((res) => {
        setFilteredRestaurants(res?.data?.data.restaurants);
        const totalPagesArray = [];
        const totalPages = Math.ceil((res?.data?.data).total / limit);
        for (var i = 0; i <totalPages; i++) {
          totalPagesArray.push(i);
        }
        setTotalPages(totalPagesArray);
      });
  }

  function handleCuisineCheck(event) {
    console.log(selectedCuisineArr);

    if (event.target.checked) {
      setSelectedCuisineArr([...selectedCuisineArr, event.target.value]);
      console.log(setSelectedCuisineArr);
    } else {
      const cloneSelectedCuisineArr = [...selectedCuisineArr];
      const selectedIndex = cloneSelectedCuisineArr.findIndex((item) => {
        return item === event.target.value;
      });
      cloneSelectedCuisineArr.splice(selectedIndex, 1);
      setSelectedCuisineArr(cloneSelectedCuisineArr);
    }
  }

  function getLocationPayload(locationPayload) {
    setPayload({ ...payload, location_code: locationPayload[0].code });
  }

  function handleCostCheck(event) {

    if (event.target.checked) {
      setSelectedCost(event.target.value);
    }
  }

  function handleCostRangeFilterCheck(event) {
    if(event.target.value==="DSC")
    {
      setFilterCode(event.target.value);
      console.log("filter code is "+filterCode);

    }
    if(event.target.value==="ASC")
    {
      setFilterCode(event.target.value);
      console.log("filter code is "+filterCode);
    }
  }

  function updateActivePage(activePage) {
    setActivePage(activePage);
    console.log(activePage);
  }

}
