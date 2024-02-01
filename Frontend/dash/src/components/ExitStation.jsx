import React from 'react';
import { useState } from 'react';

function ExitStation() {
  const [searchId, setSearchId] = useState('');
  const [checkoutResult, setcheckoutResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearch = async () => {
    if (searchId.trim() === '') {
      setError('Please enter an ID to search.');
      return;
    }

    try {
        console.log(searchId);
      
      const response = await fetch(`http://localhost:8080/tickets/authenticate/${searchId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      setcheckoutResult(data);
      console.log(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setcheckoutResult(null);
      setError('Error fetching data. Please try again.');
    //   console.log(searchResult);
    }
    setSearchId('');
  };
    return (
        <div>
          <div>
            <h2 className='search-header'>Enter ID to checkout:</h2><br/>
            <input type="text" className='input-box' value={searchId} onChange={handleSearchInputChange} />
            <br/>
            <button className='search-button' onClick={handleSearch}>CheckOut</button>
          </div>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
          {checkoutResult && <SearchResult data={checkoutResult} />}
        </div>
      );
}

export default ExitStation;