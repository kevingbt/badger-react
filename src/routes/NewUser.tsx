import { useState, useEffect } from "react";
import useFetchApi from "../hook/fetchApi";

interface userI {
  name: string;
  firstname: string;
  email: string;
  plain_password: string;
  ssh_user: string;
  ip_address: string;
  role: string;
  team?: number;
}

export default function NewUser() {
  const [client, setClient] = useState<any[]>([]);

  const [user, setUser] = useState<userI>({
    name: "",
    firstname: "",
    email: "",
    plain_password: "",
    ssh_user: "",
    ip_address: "",
    role: "ROLE_USER",
    team: undefined,
  });
  const fetchApi = useFetchApi();

  const handleChange = (key: keyof userI, value: string) => {
    setUser((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const fetchClients = async () => {
    const data = await fetchApi("GET", "admin/client");
    setClient(data);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("POST", "admin/user", user);
    console.log(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <h1>New User</h1>
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
            <option value="ROLE_CLIENT_ADMIN">Client</option>
            <option value="ROLE_DEVELOPER">Developper</option>
            <option value="ROLE_SUPER_ADMIN">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="team">Team</label>
          <select
            name="team"
            value={user.team}
            onChange={(e) => handleChange("team", e.target.value)}
          >
            <option value={0}>Sélectionnez un client</option>
            {client.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <label htmlFor="plain_password">password</label>
          <input
            type="password"
            name="plain_password"
            value={user.plain_password}
            placeholder="plain_password"
            onChange={(e) => handleChange("plain_password", e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}
