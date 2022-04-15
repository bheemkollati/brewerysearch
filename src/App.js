import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BreweryDetails from "./components/BreweryDetails";
import SearchScreen from "./components/SearchScreen";
import React, { useState } from "react";

export const searchContext = React.createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [breweryViewCount, setBreweryViewCount] = useState(5);

  const value = {
    searchTerm,
    setSearchTerm,
    breweryViewCount,
    setBreweryViewCount,
  };

  return (
    <searchContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchScreen />} />;
          <Route
            path="/breweries/search/query/:id"
            element={<BreweryDetails />}
          ></Route>
        </Routes>
      </Router>
    </searchContext.Provider>
  );
}

export default App;
