import React, { useEffect } from "react";
import { TextInput, rem, Group, Button } from "@mantine/core";
import { useState } from "react";
import { useElementSize } from "@mantine/hooks";
import classes from "./classes.css";
import searchIcons from "../images/search.png";
import appcss from "../App.css";
import DarkMode from "../components/DarkMode";
import sortascending from "../images/sort-ascending.png";
import sortdescending from "../images/sort-descending.png";
function Navbar(props) {
  const { ref } = useElementSize();
  const [value, setValue] = useState("");
  const [darkMode, setdarkMode] = useState(true);
  const [sortData, setsortData] = useState("");

  useEffect(() => {
    props.fromNavbartoAppSort(sortData);
  }, [sortData, props]);
  useEffect(() => {
    props.fromNavbartoApp(darkMode);
  }, [darkMode, props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const buttonInput = (
    <Button
      rightSection={<img src={searchIcons} height={20} alt="a"></img>}
      variant="transparent"
      onClick={() => (value ? props.moveData(value) : "")}
      style={{ marginRight: 15 }}
    />
  );
  return (
    <>
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
        <div className="navbarBookSearcher">
          <a href="/" style={{ textDecoration: "none", color: "white" }}>
            Book Searcher
          </a>
        </div>
        <div className="navbarBookSearcher">
          <TextInput
            placeholder="Search Books"
            radius="md"
            value={value}
            ref={ref}
            style={{ width: rem(500) }}
            onChange={handleSubmit}
            rightSection={buttonInput}
            onKeyDown={(e) =>
              e.key === "Enter" && value ? props.moveData(value) : null
            }
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                style={{
                  backgroundColor: darkMode ? null : "white",
                  padding: 0,
                  marginRight: 5,
                }}
                variant="transparent"
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
                <img src={sortascending} height={20} alt=""></img>
              </Button>
              <Button
                style={{
                  padding: 0,
                  marginRight: 20,
                  backgroundColor: darkMode ? null : "white",
                }}
                variant="transparent"
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
                <img src={sortdescending} height={20} alt=""></img>
              </Button>
            </div>
            <DarkMode
              fromdarkModetoNavbar={(data) => {
                setdarkMode(data);
              }}
            />
          </div>
        </div>
      </Group>
    </>
  );
}

export default Navbar;
