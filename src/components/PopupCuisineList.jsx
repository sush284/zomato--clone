import React from "react";
import { Button } from "react-bootstrap";
import '../components/PopupCuisineList.css'

export default function PopupCuisineList({ popup, setPopupValue,details }) {
  function closePopup(popup) {
    setPopupValue(false);
  }
  return (
    <section className="modal-wrapper">
    <div className="popup">
      <div className="popup-header">
        <h5><b>{details.name}</b></h5>
        <h3 onClick={closePopup}>X</h3>
      </div>

      <div className="popup-body">
        <div className="popup-body__wrapper">
          <div className="popup-body__text">
            <h5>
              <b>Recipe Name</b>
            </h5>
            <b>Cost</b>
            <br />
            <p>Made with Chole and Maida</p>
          </div>
          <div className="popup-body__image">
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/18/ec/b7/ac/pool.jpg" alt="Not available"></img>
          </div>
        
        </div>
        <div className="popup-body__wrapper">
          <div className="popup-body__text">
            <h5>
              <b>Recipe Name</b>
            </h5>
            <b>Cost</b>
            <br />
            <p>Made with Chole and Maida</p>
          </div>
          <div className="popup-body__image">
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/18/ec/b7/ac/pool.jpg" alt="Not available"></img>
          </div>
        
        </div>

        
      </div>

      <div className="popup-footer">
      <div>Subtotal:</div>
      <Button variant="danger">Pay Now</Button>

      </div>
      
      
    </div>
    </section>
  );
}
