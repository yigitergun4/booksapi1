import { useContext } from "react";
import { Pagination } from "@mantine/core";
import { UserContext } from "../Context/UserContext";

function CustomPagination() {
  const { postsPerPage, page, darkMode, handleChange } =
    useContext(UserContext);
  return (
    <Pagination
      total={40 / postsPerPage}
      withEdges
      onChange={handleChange}
      value={page}
      color={darkMode ? null : "#27374D"}
    />
  );
}

export default CustomPagination;
