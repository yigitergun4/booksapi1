import "@mantine/core/styles.css";
import { UserContext } from "./Context/UserContext";
import Appshell from "./Appshell";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <UserContext.Provider value={{}}>
        <Appshell />
      </UserContext.Provider>
      <ToastContainer />
    </MantineProvider>
  );
}

export default App;
