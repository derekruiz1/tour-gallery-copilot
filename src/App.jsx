import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';

const App = () => {
  // State to store the list of tours
  const [tours, setTours] = useState([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  // Function to fetch tours from the API
  const fetchTours = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors
    try {
      // Fetch data from the API
      const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
      if (!response.ok) {
        // Throw an error if the response is not OK
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json(); // Parse the JSON response
      setTours(data); // Update the tours state with the fetched data
    } catch (err) {
      // Catch and store any errors that occur during the fetch
      setError(err.message);
    } finally {
      // Set loading to false after the fetch is complete
      setLoading(false);
    }
  };

  // useEffect to fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Function to remove a tour by its ID
  const removeTour = (id) => {
    // Filter out the tour with the given ID and update the state
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // If loading is true, display a loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If there is an error, display the error message
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // If no tours are left, display a message and a "Refresh" button
  if (tours.length === 0) {
    return (
      <div>
        <h2>No Tours Left</h2>
        {/* Button to refetch the tours */}
        <button onClick={fetchTours} className="btn-refresh">
          Refresh
        </button>
      </div>
    );
  }

  // Render the Gallery component with the list of tours
  return (
    <div>
      <h1>Tours</h1>
      {/* Pass tours and the removeTour function as props to Gallery */}
      <Gallery tours={tours} onRemove={removeTour} />
    </div>
  );
};

export default App;