import { Routes, Route, Link, useNavigate } from "react-router";
import { useBadgerSelector } from "./store/store";
import Login from "./routes/Login";
import { useEffect } from "react";
import User from "./routes/User";
import Server from "./routes/Server";
import Vm from "./routes/Vm";
import NeedAuth from "./routes/NeedAuth";
import NewUser from "./routes/NewUser";
import NewServer from "./routes/NewServer";
import NewVM from "./routes/NewVM";
import EditUser from "./routes/EditUser";
import EditVM from "./routes/EditVM";
import EditServer from "./routes/EditServer";
import Logout from "./routes/Logout";

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ;

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
        {!token ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}

        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/server">Server</Link>
        </li>
        <li>
          <Link to="/vm">Virtual Machine</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<NeedAuth />}>
          <Route path="/user" element={<User />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/user/:id" element={<EditUser />} />

          <Route path="/server" element={<Server />} />
          <Route path="/new-server" element={<NewServer />} />
          <Route path="/server/:id" element={<EditServer />} />

          <Route path="/vm" element={<Vm />} />
          <Route path="/new-vm" element={<NewVM />} />
          <Route path="/vm/:id" element={<EditVM />} />
        </Route>
      </Routes>
    </>
  );
}
