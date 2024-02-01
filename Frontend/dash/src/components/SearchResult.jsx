const SearchResult = ({ data }) => {
    return (
      <div>
        <h3 className="search-header">Search Result:</h3>
        <p className="search-result">{data}</p>
      </div>
    );
  };

  export default SearchResult;