import React from "react";
import { Grid } from "@mantine/core";
import Navbar from "../templates/Navbar";
import MediaCard from "../components/MediaCard";
import CustomPagination from "../components/CustomPagination";
import Alert from "../components/Alert";
import CustomSelect from "../components/CustomSelect";
import { useState, useEffect } from "react";
import appcss from "../App.css";
import classescss from "../templates/classes.css";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export default function BookList() {
  const [sortState, setsortState] = useState("");
  const [darkMode, setdarkMode] = useState(false);
  const [value, setValue] = useState(generateRandomWord());
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setpostsPerPage] = useState(10);
  const lastPostIndex = page * postsPerPage;
  const firstPostsIndex = lastPostIndex - postsPerPage;
  const books = data?.items?.slice(firstPostsIndex, lastPostIndex) || [];
  const [debouncedQuery, setDebouncedQuery] = useState(value);
  const { setdarkModeAppshel, darkModeAppshel } = useContext(UserContext);
  const apiKey = "AIzaSyALRYFWbp8BkrD7ONPPH5TmJ4_oZEUR1yM";
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}&maxResults=40&orderBy=relevance`;
  const [BookCounts, setBookCounts] = useState(
    JSON.parse(localStorage.getItem("cartItems"))?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0
  );
  function generateRandomWord() {
    const characters = "abcdefgğöçşhijklmnopqrstuvwxyz";
    let result = "";
    const length = 5;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  useEffect(() => {
    setdarkModeAppshel(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    setPage(1);
  }, [postsPerPage]);
  const handleChange = (p) => {
    setPage(p);
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetch(baseURL)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [debouncedQuery]);
  const sortedBooks = books.sort((a, b) => {
    const priceA = a.saleInfo?.listPrice?.amount || 0;
    const priceB = b.saleInfo?.listPrice?.amount || 0;
    return sortState === "descending"
      ? priceB - priceA
      : sortState === "ascending"
      ? priceA - priceB
      : null;
  });
  return (
    <UserContext.Provider
      value={{
        postsPerPage,
        setpostsPerPage,
        data,
        setData,
        loading,
        setLoading,
        value,
        setValue,
        darkMode,
        setdarkMode,
        sortState,
        setsortState,
        handleChange,
        firstPostsIndex,
        lastPostIndex,
      }}
    >
      <div
        style={{
          backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
          transition: "all 0.3s linear",
        }}
      >
        <Navbar
          moveData={(data) => setValue(data)}
          fromNavbartoApp={(data) => setdarkMode(data)}
          fromNavbartoAppSort={(data) => setsortState(data)}
          BookCounts={BookCounts}
        />
        <Grid gutter={10} justify="flex-start" align="stretch" xs={4} pr={1}>
          {sortState === ""
            ? books.map((book) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                  <MediaCard
                    book={book}
                    darkMode={darkMode}
                    setBookCounts={setBookCounts}
                  />
                </Grid.Col>
              ))
            : sortState === "descending"
            ? sortedBooks.map((book) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                  <MediaCard
                    book={book}
                    darkMode={darkMode}
                    setBookCounts={setBookCounts}
                  />
                </Grid.Col>
              ))
            : sortState === "ascending"
            ? sortedBooks.map((book) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                  <MediaCard
                    book={book}
                    darkMode={darkMode}
                    setBookCounts={setBookCounts}
                  />
                </Grid.Col>
              ))
            : null}
        </Grid>
        {loading ? (
          value != null ? (
            <div className="divPagination">
              <CustomPagination />
              <CustomSelect setpostsPerPage={setpostsPerPage} />
            </div>
          ) : null
        ) : (
          <Alert darkMode={darkMode} />
        )}
      </div>
    </UserContext.Provider>
  );
}
