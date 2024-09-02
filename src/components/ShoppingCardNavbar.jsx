import React, { useEffect } from "react";
import { Group } from "@mantine/core";
import { useState } from "react";
import DarkMode from "../components/DarkMode";
import "../App.css";

import { IconNotebook } from "@tabler/icons";
function ShoppingCardNavbar(props) {
  const [darkMode, setdarkMode] = useState(true);
  useEffect(() => {
    props.fromShoppingCardNavbarToApp(darkMode);
  }, [props, darkMode]);
  const styleGroup = {
    backgroundColor: darkMode ? null : "#27374D",
    transition: "all 0.3s linear",
  };
  return (
    <Group
      justify="center"
      align="center"
      className={
        JSON.parse(localStorage.getItem("darkMode")) ? "demo" : "demoo"
      }
      grow
      preventGrowOverflow={false}
      style={styleGroup}
    >
      <div className="navbarBookSearcher">
        <a href="/" className="navbarBookSearcher">
          <IconNotebook size={30} /> Book Searcher
        </a>
      </div>

      <div className="darktheme">
        <div>
          <DarkMode
            fromdarkModetoNavbar={(data) => {
              setdarkMode(data);
            }}
          />
        </div>
      </div>
    </Group>
  );
}

export default ShoppingCardNavbar;
