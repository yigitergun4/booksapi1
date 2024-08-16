import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Navbar from "./templates/Navbar";
import MediaCard from "./components/MediaCard";
import { Grid } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import appcss from "./App.css";
import Alert from "./components/Alert";

function App() {
  const apiKey = "AIzaSyALRYFWbp8BkrD7ONPPH5TmJ4_oZEUR1yM";
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}&maxResults=40&orderBy=relevance`;
  const [postsPerPage, setpostsPerPage] = useState(10);
  const lastPostIndex = page * postsPerPage;
  const firstPostsIndex = lastPostIndex - postsPerPage;
  const [darkMode, setdarkMode] = useState(true);
  const [sortState, setsortState] = useState("");

  const datas = async () => {
    const response = await axios.get(baseURL);
    setData(response);
  };
  useEffect(() => {
    setPage(1);
  }, [postsPerPage]);

  useEffect(() => {
    if (value) {
      datas();
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    } else {
    }
  }, [value]);
  const handleChange = (p) => {
    setPage(p);
  };
  const books = data?.data?.items.slice(firstPostsIndex, lastPostIndex) || [];

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
    <div
      style={{
        backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
        transition: "all 0.3s linear",
      }}
    >
      <MantineProvider>
        <Navbar
          moveData={(data) => setValue(data)}
          fromNavbartoApp={(data) => setdarkMode(data)}
          fromNavbartoAppSort={(data) => setsortState(data)}
        />
        <Grid
          gutter={10}
          justify="flex-start"
          align="stretch"
          item
          xs={4}
          pr={1}
        >
          {sortState === ""
            ? data?.data?.items
                .slice(firstPostsIndex, lastPostIndex)
                .map((book) => (
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                    <MediaCard book={book} darkMode={darkMode} />
                  </Grid.Col>
                ))
            : sortState === "descending"
            ? sortedBooks.map((book) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                  <MediaCard book={book} darkMode={darkMode} />
                </Grid.Col>
              ))
            : sortState === "ascending"
            ? sortedBooks.map((book) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={book.id}>
                  <MediaCard book={book} darkMode={darkMode} />
                </Grid.Col>
              ))
            : null}
        </Grid>
        {value && loading ? (
          <div className="divPagination">
            <Pagination
              total={40 / postsPerPage}
              withEdges
              onChange={handleChange}
              value={page}
              color={darkMode ? null : "#121212"}
            />
            <div
              style={{
                marginLeft: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <select
                name="per Page"
                onChange={(e) => setpostsPerPage(e.target.value)}
                style={{
                  borderRadius: 12,
                  border: "none",
                  paddingLeft: 8,
                  margin: 0,
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  cursor: "inherit",
                  lineHeight: "inherit",
                }}
                defaultValue={"10"}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        ) : (
          <Alert darkMode={darkMode} />
        )}
      </MantineProvider>
    </div>
  );
}

export default App;
