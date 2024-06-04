import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import ControllerUi from "./components/music/controller/ControllerUi";

function App() {
  return (
    <>
      <RouterProvider router={root} />
      <ControllerUi></ControllerUi>
    </>
  );
}

export default App;
