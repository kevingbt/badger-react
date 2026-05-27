import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";

interface userI {
  name: string;
  firstname: string;
  email: string;
  ssh_user: string;
  ip_address: string;
  role: string;
}

export default function EditUser() {
  const fetchApi = useFetchApi();
  const { id } = useParams();
  const [user, setUser] = useState<userI>({
    name: "",
    firstname: "",
    email: "",
    ssh_user: "",
    ip_address: "",
    role: "ROLE_USER",
  });

  const fetchUser = async () => {
    const data = await fetchApi("GET", `admin/user/${id}`);
    setUser({
      name: data.name,
      firstname: data.firstname,
      email: data.email,
      ssh_user: data.ssh_user,
      ip_address: data.ip_address,
      role: data.roles[0],
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (key: keyof userI, value: string) => {
    setUser((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("PATCH", `admin/user/${id}`, user);
    console.log(data);
  };

  return (
    <>
      <h1>Edit User - {id}</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="nom"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label htmlFor="firstname">Prenom</label>
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            placeholder="firstname"
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <label htmlFor="ssh_user">SSH user</label>
          <input
            type="text"
            name="ssh_user"
            value={user.ssh_user}
            placeholder="ssh_user "
            onChange={(e) => handleChange("ssh_user", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ip_address">Adresse ip</label>
          <input
            type="text"
            name="ip_address"
            value={user.ip_address}
            placeholder="ip_address"
            onChange={(e) => handleChange("ip_address", e.target.value)}
          />
          <label htmlFor="name">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_MANAGER">Manager</option>
            <option value="ROLE_DEVELOPER">Developper</option>
            <option value="ROLE_SUPER_ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}
