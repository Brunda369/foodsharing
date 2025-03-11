import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Community Food Sharing</h1>
      <p>Share food with those in need in your community.</p>
      <Link to="/listings"><button style={{ padding: "10px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>View Listings</button></Link>
      <Link to="/add"><button style={{ padding: "10px", marginTop: "10px", marginLeft: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>Add Listing</button></Link>
    </div>
  );
}

function Listings({ listings }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Food Listings</h2>
      {listings.map((item) => (
        <div key={item.id} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px" }}>
          <h3>{item.food}</h3>
          <p>📍 {item.location}</p>
          <p>👤 Donor: {item.donor}</p>
        </div>
      ))}
      <Link to="/"><button style={{ padding: "10px", marginTop: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}>Back to Home</button></Link>
    </div>
  );
}

function AddListing({ addListing, newFood, setNewFood, newLocation, setNewLocation }) {
  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Add a New Food Listing</h2>
      <input type="text" placeholder="Food Item" value={newFood} onChange={(e) => setNewFood(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
      <input type="text" placeholder="Location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
      <button onClick={addListing} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Share Food</button>
      <Link to="/"><button style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}>Back to Home</button></Link>
    </div>
  );
}

export default function CommunityFoodSharing() {
  const [listings, setListings] = useState([
    { id: 1, food: "Rice & Curry", location: "Bangalore", donor: "John Doe" },
    { id: 2, food: "Bread & Milk", location: "Mumbai", donor: "Jane Smith" },
  ]);
  const [newFood, setNewFood] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const addListing = () => {
    if (newFood && newLocation) {
      const newEntry = { id: listings.length + 1, food: newFood, location: newLocation, donor: "You" };
      setListings([...listings, newEntry]);
      setNewFood("");
      setNewLocation("");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings listings={listings} />} />
        <Route path="/add" element={<AddListing addListing={addListing} newFood={newFood} setNewFood={setNewFood} newLocation={newLocation} setNewLocation={setNewLocation} />} />
      </Routes>
    </Router>
  );
}
