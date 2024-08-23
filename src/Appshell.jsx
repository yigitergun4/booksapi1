import React from "react";
import BookList from "./components/BookList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingCard from "./components/ShoppingCard";
import { UserContext } from "./Context/UserContext";

export default function Appshell() {
  const [darkModeAppshel, setdarkModeAppshel] = React.useState(true);

  return (
    <>
      <UserContext.Provider value={{ darkModeAppshel, setdarkModeAppshel }}>
        <Router>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/shopping-detail" element={<ShoppingCard />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}
