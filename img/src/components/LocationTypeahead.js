/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../index.css";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";

export default function LocationTypeahead(props) {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9192/getLocations`).then((res) => {
      console.log("Location typeahead");
      console.log(res.data.data);
      setLocations(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedLocation.length > 0) {
      props.callRestaurants(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <Typeahead
      className="mt-100"
      id="locations"
      labelKey="name"
      selected={selectedLocation}
      onChange={setSelectedLocation}
      placeholder="Enter your location..."
      options={locations}
    ></Typeahead>
  );
}
