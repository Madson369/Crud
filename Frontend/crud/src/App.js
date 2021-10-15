import Home from "./Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Home></Home>
      <ToastContainer />
    </div>
  );
}

export default App;
