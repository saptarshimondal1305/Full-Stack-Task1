import React from 'react';
import { useState } from 'react';
import SearchResult from './SearchResult';

function CheckInOut() {
  const [searchId, setSearchId] = useState('');
  const [result, setresult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchId(event.target.value);
  };

  const handlecheckIn = async () => {
    if (searchId.trim() === '') {
      setError('Please enter an ID to search.');
      return;
    }

    try {
        console.log(searchId);
      
      const response = await fetch(`http://localhost:8080/tickets/checkIn/${searchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchId),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      setresult(data);
      console.log(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setresult(null);
      setError('Error fetching data. Please try again.');
    //   console.log(searchResult);
    }
    setSearchId('');
  };


  const handleCheckOut= async () => {
    if (searchId.trim() === '') {
      setError('Please enter an ID to search.');
      return;
    }

    try {
        console.log(searchId);
      
        const response = await fetch(`http://localhost:8080/tickets/checkOut/${searchId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchId),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      setresult(data);
      console.log(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setresult(null);
      setError('Error fetching data. Please try again.');
    //   console.log(searchResult);
    }
    setSearchId('');
  };



    return (
        <div>
          <div>
            <h2 className='search-header'>Enter ID to checkin/checkout:</h2><br/>
            <input type="text" className='input-box' value={searchId} onChange={handleSearchInputChange} />
            <br/>
            <div>
                <button className='checkin-button' onClick={handlecheckIn}>CheckIn</button>
                <button className='checkout-button' onClick={handleCheckOut}>CheckOut</button>
            </div>
          </div>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
          {result && <SearchResult data={result} />}
        </div>
      );
}

export default CheckInOut;
