import React, { useState } from "react";
import ShoppingCardNavbar from "./ShoppingCardNavbar";
import ShoppingCardDetail from "./ShoppingCardDetail";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function ShoppingCard() {
  const { darkModeAppshel, setdarkModeAppshel } = useContext(UserContext);
  const fromShoppingCardNavbarToApp = (darkMode) => {
    setdarkModeAppshel(darkMode);
  };

  return (
    <>
      <UserContext.Provider value={{ darkModeAppshel, setdarkModeAppshel }}>
        <ShoppingCardNavbar
          fromShoppingCardNavbarToApp={fromShoppingCardNavbarToApp}
        />
        <ShoppingCardDetail />
      </UserContext.Provider>
    </>
  );
}

export default ShoppingCard;
