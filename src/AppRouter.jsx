import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import ShoppingCard from "./components/ShoppingCard";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/shopping-detail" element={<ShoppingCard />} />
        </Routes>
      </Router>
    </>
  );
}
