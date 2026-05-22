import { Routes, Route, Link, useNavigate } from "react-router";
import { useBadgerSelector } from "./store/store";
import Login from "./routes/login";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();
  const token = useBadgerSelector((state) => state.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/server");
    }
  }, []);

  return (
    <>
      <h1>Badger</h1>

      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
