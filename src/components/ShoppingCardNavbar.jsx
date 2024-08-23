import React, { useEffect } from "react";
import { Group } from "@mantine/core";
import { useState } from "react";
import DarkMode from "../components/DarkMode";

import appcss from "../App.css";

function ShoppingCardNavbar(props) {
  const [darkMode, setdarkMode] = useState(true);

  useEffect(() => {
    props.fromShoppingCardNavbarToApp(darkMode);
  }, [darkMode]);

  return (
    <Group
      justify="center"
      align="center"
      className={darkMode ? "demo" : "demoo"}
      grow
      preventGrowOverflow={false}
      style={{
        backgroundColor: darkMode ? null : "rgb(30, 30, 30)",
        borderBottom: "0.5px solid rgb(212, 212, 212)",
        transition: "all 0.3s linear",
      }}
    >
      <div className="navbarBookSearcher">
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          Book Searcher
        </a>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      ></div>
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
