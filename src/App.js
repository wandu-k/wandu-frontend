import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import CalendarUi from "./components/calendar/CalendarUi";
import NavigationUi from "./components/navigation/NavigationUi";
import ControllerUi from "./components/music/controller/ControllerUi";
import { MusicProvider } from "./contexts/MusicContext";

function App() {
  return <RouterProvider router={root} />;
}

export default App;
