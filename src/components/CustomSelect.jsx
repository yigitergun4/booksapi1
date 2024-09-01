import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "../App.css";
function CustomSelect() {
  const { setpostsPerPage } = useContext(UserContext);
  return (
    <div className="customSelectDiv">
      <select
        name="per Page"
        onChange={(e) => setpostsPerPage(e.target.value)}
        defaultValue={"10"}
        className="customSelectDivSelect"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
export default CustomSelect;
