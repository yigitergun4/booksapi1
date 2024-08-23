import React from "react";
import { Pagination } from "@mantine/core";
import { UserContext } from "../Context/UserContext";

function CustomPagination() {
  const { postsPerPage, page, darkMode, handleChange } =
    React.useContext(UserContext);
  return (
    <Pagination
      total={40 / postsPerPage}
      withEdges
      onChange={handleChange}
      value={page}
      color={darkMode ? null : "#121212"}
    />
  );
}

export default CustomPagination;
