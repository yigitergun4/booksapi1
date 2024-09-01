import React, { useContext, useEffect } from "react";
import { Group, Button } from "@mantine/core";
import { useState } from "react";
import { useElementSize } from "@mantine/hooks";
import DarkMode from "../components/DarkMode";
import { IconSortDescending } from "@tabler/icons";
import { IconSortAscending } from "@tabler/icons";
import { UserContext } from "../Context/UserContext";
import { IconShoppingCart, IconNotebook } from "@tabler/icons";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import "../App.css";

function Navbar(props) {
  const { ref } = useElementSize();
  const [darkMode, setdarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );
  const [sortData, setsortData] = useState("");
  const { value, setValue, books } = useContext(UserContext);
  const handleSort = (type) => {
    setsortData((prevSortData) => (prevSortData === type ? "" : type));
  };
  const onDataChange = (e) => {
    setValue(e);
  };
  const styleGroup = {
    backgroundColor: darkMode ? null : "#27374D",
    borderBottom: "0.5px solid rgb(212, 212, 212)",
    marginBottom: "5px",
  };
  const styleButton = {
    transition: "all 0.3s linear",
    color: JSON.parse(localStorage.getItem("darkMode")) ? "black" : "white",
  };
  useEffect(() => {
    props.fromNavbartoAppDarkMode(darkMode);
  }, [darkMode, props]);
  useEffect(() => {
    props.fromNavbartoAppSort(sortData);
  }, [sortData, props]);
  return (
    <UserContext.Provider value={{ value, books }}>
      <Group
        justify="center"
        ref={ref}
        align="center"
        className={
          JSON.parse(localStorage.getItem("darkMode")) ? "demo" : "demoo"
        }
        grow
        preventGrowOverflow={false}
        style={styleGroup}
      >
        <div className="navbar-container">
          <a href="/">
            <IconNotebook size={30} />
            Book Searcher
          </a>
          <div>
            <SearchInput onDataChange={onDataChange} />
          </div>
          <div>
            <div>
              <Button
                variant="transparent"
                size="xs"
                px={0}
                py={0}
                style={styleButton}
                color={
                  JSON.parse(localStorage.getItem("darkMode"))
                    ? "black"
                    : "white"
                }
                onClick={() => {
                  handleSort("descending");
                }}
              >
                <IconSortDescending size={30} />
              </Button>
              <Button
                variant="transparent"
                size="xs"
                px={0}
                py={0}
                style={styleButton}
                onClick={() => {
                  handleSort("ascending");
                }}
              >
                <IconSortAscending size={30} />
              </Button>
            </div>
            <DarkMode
              fromdarkModetoNavbar={(data) => {
                setdarkMode(data);
              }}
            />
            <Link to="shopping-detail">
              <Button variant="transparent" style={styleButton}>
                <IconShoppingCart size={30} />
                <span>{props.BookCounts}</span>
              </Button>
            </Link>
          </div>
        </div>
      </Group>
    </UserContext.Provider>
  );
}

export default Navbar;
