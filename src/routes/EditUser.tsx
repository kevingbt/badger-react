import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
import UserForm, { userI } from "../components/UserForm";

export default function EditUser() {
  const fetchApi = useFetchApi();
  const { id } = useParams();

  const [user, setUser] = useState<userI>({
    name: "",
    firstname: "",
    email: "",
    plain_password: "",
    ssh_user: "",
    ip_address: "",
    role: "ROLE_USER",
    team: "",
  });

  const fetchUser = async () => {
    const data = await fetchApi("GET", `admin/user/${id}`);
    const teamId =
      data.team && typeof data.team === "object" ? data.team.id : data.team;
    setUser({
      name: data.name,
      firstname: data.firstname,
      email: data.email,
      plain_password: data.plain_password,
      ssh_user: data.ssh_user,
      ip_address: data.ip_address,
      role: data.roles[0],
      team: teamId ?? "",
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserForm userInfo={user} id={Number(id)} />;
}
