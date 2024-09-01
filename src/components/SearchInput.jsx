import React, { useState } from "react";
import "../App.css";
import { TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
function SearchInput({ onDataChange }) {
  const [data, setData] = useState("");
  const handleInputChange = (e) => {
    setData(e.target.value);
  };
  const handleSearch = () => {
    onDataChange(data);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const styleButton = {
    padding: "0px",
  };
  return (
    <TextInput
      type="text"
      value={data}
      onChange={handleInputChange}
      placeholder="Please enter a book or author..."
      className="search-input"
      onKeyDown={handleKeyDown}
      rightSection={
        <Button
          onClick={handleSearch}
          variant="transparent"
          style={styleButton}
        >
          <IconSearch color={"black"} />
        </Button>
      }
    />
  );
}

export default SearchInput;
