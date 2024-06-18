import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Main Search component
function Search() {
  // State to store the search term and search results
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Access location object to get the data passed from the Admin component
  const location = useLocation();
  const data = location.state?.data; // Access data from state if available

  // Use effect to log the received data for debugging purposes
  useEffect(() => {
    console.log("Data received in Search component:", data); // Debugging log
  }, [data]);

  // Function to handle the search logic
  const handleSearch = () => {
    const results = [];
    if (data && data.length > 0) {
      data.forEach((item) => {
        if (item.email) { // Check if email field exists
          // Check if email starts with or includes the search term (case insensitive)
          if (
            item.email.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            results.push(item); // Add matching item to results
          }
        }
      });
    }
    console.log("Search results:", results); // Debugging log
    setSearchResults(results); // Update search results state
  };

  // Function to handle Enter key press event for search
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h3>Check INSPIRE / ASPIRE Program Progress!</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Enter Pace Email Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br />

      {searchResults && searchResults.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {searchResults[0].visaCode === "F1" ? ( // Check if the first result has visa code "F1"
                <>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Inspire Program</th>
                  <th scope="col">Career Community</th>
                  <th scope="col">Resume</th>
                  <th scope="col">International Guide</th>
                  <th scope="col">LinkedIn Profile</th>
                  <th scope="col">Interviewing</th>
                  <th scope="col">Job Search</th>
                </>
              ) : (
                <>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">ASPIRE Program</th>
                  <th scope="col">Career Community</th>
                  <th scope="col">Resume ASPIRE</th>
                  <th scope="col">LinkedIn Profile</th>
                  <th scope="col">Interviewing</th>
                  <th scope="col">Job Search</th>
                  <th scope="col">Unleash Professional Quiz</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.visaCode === "F1" ? ( // Conditional rendering based on visa code
                  <>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.inspireProgram}</td>
                    <td>{row.careerCommunity}</td>
                    <td>{row.resume}</td>
                    <td>{row.internationalGuide}</td>
                    <td>{row.linkedInProfile}</td>
                    <td>{row.interviewing}</td>
                    <td>{row.jobSearch}</td>
                  </>
                ) : (
                  <>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.aspireProgram}</td>
                    <td>{row.careerCommunity}</td>
                    <td>{row.resumeAspire}</td>
                    <td>{row.linkedInProfile}</td>
                    <td>{row.interviewing}</td>
                    <td>{row.jobSearch}</td>
                    <td>{row.unleashProfessionalQuiz}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Enter Pace Email in "xy12345z@pace.edu" Format.</p>
      )}
    </div>
  );
}

export default Search;
