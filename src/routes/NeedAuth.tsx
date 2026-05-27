import { useBadgerSelector } from "../store/store";
import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";

export default function NeedAuth() {
  const token = localStorage.getItem("token");
  const user = useBadgerSelector((state) => state.user);
  const currentTime = Math.floor(Date.now() / 1000);

  useEffect(() => {
    if (!token || !user || user.iat > currentTime) {
      <Navigate to="/logout" />;
    }
  });

  return token ? <Outlet /> : <Navigate to="/login" />;
}
