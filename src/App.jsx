import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import LoginSignup from "./pages/login-signup/LoginSignup";
import { useAuthContext } from "./context/AuthContext";
import Scores from "./pages/scores/Scores";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/scores" element={<Scores />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginSignup />}
        />
      </Routes>
    </>
  );
}

export default App;
