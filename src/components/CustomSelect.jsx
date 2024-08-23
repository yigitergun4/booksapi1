import React from "react";
import { UserContext } from "../Context/UserContext";

function CustomSelect() {
  const { setpostsPerPage } = React.useContext(UserContext);
  return (
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
  );
}
export default CustomSelect;
