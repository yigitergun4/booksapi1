import React, { useContext, useEffect } from "react";
import { rem, Group, Button } from "@mantine/core";
import { useState } from "react";
import { useElementSize } from "@mantine/hooks";
import DarkMode from "../components/DarkMode";
import { IconSortDescending } from "@tabler/icons";
import { IconSortAscending } from "@tabler/icons";
import { UserContext } from "../Context/UserContext";
import { IconShoppingCart, IconNotebook } from "@tabler/icons";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";

function Navbar(props) {
  const { ref } = useElementSize();
  const [darkMode, setdarkMode] = useState(true);
  const [sortData, setsortData] = useState("");
  const { value, setValue, books } = useContext(UserContext);

  useEffect(() => {
    props.fromNavbartoApp(value);
  }, [value]);
  useEffect(() => {
    props.fromNavbartoAppSort(sortData);
  }, [sortData, props]);
  useEffect(() => {
    props.fromNavbartoApp(darkMode);
    localStorage.setItem("darkmode", darkMode);
  }, [darkMode, props]);
  const onDataChange = (e) => {
    setValue(e);
  };
  return (
    <UserContext.Provider value={{ value, books }}>
      <Group
        justify="center"
        ref={ref}
        align="center"
        className={darkMode ? "demo" : "demoo"}
        grow
        preventGrowOverflow={false}
        style={{
          backgroundColor: darkMode ? null : "rgb(30, 30, 30)",
          borderBottom: "0.5px solid rgb(212, 212, 212)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>
            <IconNotebook size={30} />
          </span>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: rem(20),
            }}
          >
            Book Searcher
          </a>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="navbarBookSearcherInput">
            <SearchInput onDataChange={onDataChange} />
          </div>
          <div>
            <Button
              style={{
                padding: 0,
                position: "absolute",
                right: 345,
                top: 13,
                zIndex: 1,
                transition: "all 0.3s linear",
              }}
              variant="transparent"
              color={darkMode ? "black" : "white"}
              onClick={() =>
                setsortData(
                  sortData === ""
                    ? "ascending"
                    : sortData === "descending"
                    ? "ascending"
                    : ""
                )
              }
            >
              <IconSortAscending size={30} />
            </Button>
            <Button
              style={{
                padding: 0,
                position: "absolute",
                right: 375,
                top: 13,
                zIndex: 1,
                transition: "all 0.3s linear",
              }}
              variant="transparent"
              color={darkMode ? "black" : "white"}
              onClick={() =>
                setsortData(
                  sortData === ""
                    ? "descending"
                    : sortData === "ascending"
                    ? "descending"
                    : ""
                )
              }
            >
              <IconSortDescending size={30} />
            </Button>
          </div>
        </div>
        <div className="darktheme">
          <div style={{ position: "absolute", right: 200 }}>
            <Link to="shopping-detail">
              <Button
                variant="transparent"
                color={darkMode ? "black" : "white"}
                style={{
                  transition: "all 0.3s linear",
                }}
              >
                <IconShoppingCart size={30} />
                <span>{props.BookCounts}</span>
              </Button>
            </Link>
          </div>

          <div>
            <DarkMode
              fromdarkModetoNavbar={(data) => {
                setdarkMode(data);
              }}
            />
          </div>
        </div>
      </Group>
    </UserContext.Provider>
  );
}

export default Navbar;
