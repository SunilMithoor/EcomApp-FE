import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Search() {
  const { id } = useParams(); // Get the ID from the URL
  const location = useLocation(); // Get the state from navigation
  const data = location.state?.data; // Access the passed data object

  return (
    <div className="search-container">
      {/* Header */}
      <header className="search-header">
        <h1>Search Page</h1>
      </header>

      <p>Search Details for ID: {id}</p>
      {/* <p>Search Details for ID: {location}</p> */}
      {/* Safely render data properties */}
      {data ? (
        <div>
          <h3>Name: {data.name}</h3>
          <p>Description: {data.description}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
          {/* Display full object as JSON for debugging */}
        </div>
      ) : (
        <p>No additional details available.</p>
      )}

      {/* Main Content */}
      <main className="search-content">
        <p>
          Welcome to the search page! Use the search bar to find what you need.
        </p>
        {/* You can add a search bar or additional content here */}
      </main>
    </div>
  );
}

export default Search;
