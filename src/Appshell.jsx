import React, { useState } from "react";
import AppRouter from "./AppRouter";
import { UserContext } from "./Context/UserContext";

export default function Appshell() {
  const [darkModeAppshel, setdarkModeAppshel] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );
  return (
    <>
      <UserContext.Provider value={{ setdarkModeAppshel, darkModeAppshel }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  );
}
