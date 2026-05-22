import { useState } from "react";
import { useBadgerDispatch } from "../store/store";
import { setToken } from "../store/TokenSlice";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const tokenDispatch = useBadgerDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("https://badger.arcplex.dev/api/v2/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    setEmail("");
    setPassword("");
    localStorage.setItem("token", data.jwt);
    tokenDispatch(setToken(data.jwt));
    navigate("/server");
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
}
