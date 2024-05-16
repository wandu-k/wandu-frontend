import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import { LoginProvider } from "./contexts/LoginContext";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
