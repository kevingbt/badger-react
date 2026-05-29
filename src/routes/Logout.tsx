import { useBadgerDispatch } from "../store/store";
import { setUser } from "../store/UserSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useBadgerDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/login");
  }, [dispatch, navigate]);

  return <h1>Logout</h1>;
}
