import { useState } from "react";
import { useBadgerDispatch } from "../store/store";
import { setUser } from "../store/UserSlice";
import { useNavigate } from "react-router";
import useFetchApi from "../hook/fetchApi";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const userDispatch = useBadgerDispatch();
  const authorizationDispatch = useBadgerDispatch();
  const fetchApi = useFetchApi();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const decode = (token: string) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("POST", "login", { email, password });
    if (!data) {
      return;
    }
    setEmail("");
    setPassword("");
    const user = decode(data.jwt);
    localStorage.setItem("token", data.jwt);
    userDispatch(setUser(user));
    navigate("/server");
  };

  return (
    <div className={styles.login}>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
