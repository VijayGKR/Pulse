import { useState, useEffect } from 'react';
import { sendToContentScript } from '@plasmohq/messaging';
import React from 'react';
import { Remarkable } from 'remarkable';

export default function IndexPopup() {
  const [commentAnalysis, setCommentAnalysis] = useState("Loading analysis...");

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      try {
        const response = await sendToContentScript({
          name: 'main',
        });
        if (response) {
          console.log("Response received:", response.data);
          setCommentAnalysis(response.data); // Directly use the response as text
        } else {
          setCommentAnalysis("Still Fetching");
          console.log("No data received");
          setTimeout(fetchData, 500); // Wait 500 ms before calling fetchData again
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setCommentAnalysis("Failed to load analysis."); // Set error message if the fetch fails
      }
    }
  
    fetchData();
  }, []);
  

  const md = new Remarkable();
  const getMarkdownText = () => {
    return { __html: md.render(commentAnalysis) };
  };
  

  return (
    <div style={{
      padding: 16,
      minWidth: "400px", // Increased width
      margin: "auto",
      fontSize: "14px", // Smaller font size
      border: "1px solid #ccc", // Optional: adds a border to make the rounded corners more visible
      backgroundColor: "#fff", // Optional: adds a background color
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)" // Optional: adds a slight shadow for depth
    }}>
      <h2 style={{ fontSize: "18px" }}>Comment Analysis</h2>
      <div dangerouslySetInnerHTML={getMarkdownText()} />
    </div>
  );
}
