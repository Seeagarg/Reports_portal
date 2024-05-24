import { useNavigate } from "react-router-dom";
import Routing from "./Routes/Routing";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    let token = localStorage.getItem("userToken");
    if (
      token === null ||
      token === undefined ||
      token === "" ||
      token === " "
    ) {
      navigate("/");
    }
  };

  return (
      <Routing />
  );
}

export default App;
