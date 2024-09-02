import React from "react";
import { Grid } from "@mantine/core";
import Navbar from "../templates/Navbar";
import MediaCard from "../components/MediaCard";
import CustomPagination from "../components/CustomPagination";
import CustomSelect from "../components/CustomSelect";
import { useState, useEffect } from "react";
import "../App.css";
import { UserContext } from "../Context/UserContext";

function BookList() {
  const [sortState, setsortState] = useState("");
  const [darkMode, setdarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );
  const [value, setValue] = useState("nutuk");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setpostsPerPage] = useState(10);
  const lastPostIndex = page * postsPerPage;
  const firstPostsIndex = lastPostIndex - postsPerPage;
  const books = data?.items?.slice(firstPostsIndex, lastPostIndex) || [];
  const [BookCounts, setBookCounts] = useState(
    JSON.parse(localStorage.getItem("cartItems"))?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0
  );
  const fromNavbartoAppDarkMode = (data) => {
    setdarkMode(data);
  };
  const sortedBooks = books.sort((a, b) => {
    const priceA = a.saleInfo?.listPrice?.amount || 0;
    const priceB = b.saleInfo?.listPrice?.amount || 0;
    return sortState === "descending"
      ? priceB - priceA
      : sortState === "ascending"
      ? priceA - priceB
      : null;
  });

  useEffect(() => {
    fromNavbartoAppDarkMode(darkMode);
  }, [darkMode]);
  useEffect(() => {
    setPage(1);
  }, [postsPerPage]);
  const handleChange = (p) => {
    setPage(p);
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
        );
        const data = await response.json();
        setData(data);
        setLoading(true);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [value]);
  const styleDiv = {
    backgroundColor: darkMode ? null : "#27374D",
    transition: "all 0.3s linear",
  };
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
      <div style={styleDiv}>
        <Navbar
          moveData={(data) => setValue(data)}
          fromNavbartoAppDarkMode={(data) => setdarkMode(data)}
          fromNavbartoAppSort={(data) => setsortState(data)}
          BookCounts={BookCounts}
        />
        <Grid gutter={5} justify="flex-start">
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
        <div>
          {loading ? (
            value != null ? (
              <div className="divPagination">
                <CustomPagination />
                <CustomSelect setpostsPerPage={setpostsPerPage} />
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </UserContext.Provider>
  );
}
export default BookList;
