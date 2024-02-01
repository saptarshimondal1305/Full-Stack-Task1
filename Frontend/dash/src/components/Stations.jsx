import React, { useState } from "react";
import { stationsdata as stations } from "../stationdata";
import "./styles.css";
import StationDropdown from "./StationDropdown";

export default function Stations() {
  const [startStation, setStartStation] = useState("s1");
  const [endStation, setEndStation] = useState("s1");
  const [priceDifference, setPriceDifference] = useState(0);
  const[ticketId,setTicketId]=useState(null);

  const handleStartStationChange = (event) => {
    setStartStation(event.target.value);
    // calculatePriceDifference(event.target.value, endStation);
  };

  const handleEndStationChange = (event) => {
    setEndStation(event.target.value);
    calculatePriceDifference(startStation, event.target.value);
  };

  const handleGenerateTicket = async () => {
    if (startStation === "" || endStation === "") {
      return;
    }
    

    const requestBody = {
      price: priceDifference,
      startStation: startStation,
      endStation: endStation,
    };

    const res = await fetch("http://localhost:8080/tickets/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if(!res.ok){
        return console.log(res.message || "Something went wrong!")
    }
    setTicketId(data.id);
    console.log(data);
  };

  const calculatePriceDifference = (start, end) => {
    const startPrice = stations[start].price;
    const endPrice = stations[end].price;
    const difference = Math.abs(endPrice - startPrice);
    setPriceDifference(difference);
  };



  return (
    <>
    <div className="container">
      <h2 className="header">Ticket Booking App</h2>
      <StationDropdown
        label="Start Station"
        stationsList={Object.keys(stations)}
        value={startStation}
        onChange={handleStartStationChange}
      />
      <StationDropdown
        label="End Station"
        stationsList={Object.keys(stations)}
        value={endStation}
        onChange={handleEndStationChange}
      />
      <p className="price-difference">Price Difference: {priceDifference}</p>

      <button
        onClick={handleGenerateTicket}
        className="button"
      >
        Generate Ticket
      </button>

    
    </div>
    <div className="ticketid">
        {ticketId && <p>Ticket Id: {ticketId}</p>}
    </div>

    </>
  );
}
