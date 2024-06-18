import React, { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

// Main Admin component
function Admin() {
  // State to store the parsed data and file name
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");

  // Reference to the file input element
  const fileRef = useRef();

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to check if the uploaded file is an Excel file
  const isExcelFile = (file) => {
    const allowedExtensions = [".xlsx", ".xls"];
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  // Event handler for file input change
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return; // If no file is selected, do nothing

    if (isExcelFile(file) && file.size !== 0) {
      const reader = new FileReader();
      reader.readAsBinaryString(file); // Read the file as binary string
      reader.onload = (e) => {
        const data1 = e.target.result;
        const workbook = XLSX.read(data1, { type: "binary" }); // Parse the binary string as an Excel workbook
        const sheetName = workbook.SheetNames[0]; // Get the first sheet name
        const sheet = workbook.Sheets[sheetName]; // Get the first sheet
        const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: null }); // Convert the sheet to JSON

        // Extract specific columns including email and visa code
        const selectedColumns = parsedData.map((row) => ({
          firstName: row["Calculated_First_Name"] || "",
          lastName: row["REGSEL1_LAST_NAME"] || "",
          inspireProgram: row["Inspire Program"] || "",
          aspireProgram: row["ASPIRE Program"] || "",
          careerCommunity: row["Career Community"] || "",
          resume: row["Resume"] || "",
          resumeAspire: row["Resume ASPIRE"] || "",
          internationalGuide: row["International_Student_Guide_to_Gaining_Experience_in_the_US"] || "",
          linkedInProfile: row["LinkedIn Profile"] || "",
          interviewing: row["Interviewing"] || "",
          jobSearch: row["Job Search"] || "",
          unleashProfessionalQuiz: row["UnleashYourInnerProfessionalQuiz"] || "",
          email: row["REGSEL1_EMAIL_ADDRESS"] || "",
          visaCode: row["REGSEL1_VISA_CODE"] || ""
        }));

        console.log("Parsed data:", selectedColumns); // Debugging log

        // Update the state with parsed data and file name
        setData(selectedColumns);
        setFileName(file.name);
      };
    } else {
      alert("Invalid file format"); // Alert the user if the file is not an Excel file
    }
  };

  // Event handler to remove the selected file
  const handleRemoveFile = () => {
    setFileName(null); // Clear the file name
    fileRef.current.value = ""; // Reset the file input element
    setData([]); // Clear the parsed data
  };

  // Event handler for the search button click
  const handleSearchClick = () => {
    navigate("/search", { state: { data } }); // Navigate to the search page and pass the data as state
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <br />

      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Upload file</label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept=".xlsx,.xls"
          onChange={handleFile}
          ref={fileRef}
        />
        {fileName && (
          <>
            <span>File Attached: {fileName}</span>
            <button className="removeFile" onClick={handleRemoveFile}>
              Remove File
            </button>
          </>
        )}
      </div>

      <br />

      {fileName && ( // Only show button if a file is uploaded
        <button className="btn btn-primary" onClick={handleSearchClick}>
          Search Data
        </button>
      )}
    </div>
  );
}

export default Admin;
