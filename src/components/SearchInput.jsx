import React, { useState } from "react";
import appcss from "../App.css";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

function SearchInput({ onDataChange }) {
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    setData(e.target.value);
    onDataChange(e.target.value);
  };

  return (
    <TextInput
      type="text"
      value={data}
      onChange={handleInputChange}
      placeholder="Please enter a book or author..."
      className="search-input"
      rightSection={<IconSearch color="black" />}
    />
  );
}

export default SearchInput;
