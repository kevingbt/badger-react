import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
import styles from "./new.module.css";

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

export default function EditUser() {
  const fetchApi = useFetchApi();
  const { id } = useParams();
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

  const fetchUser = async () => {
    const data = await fetchApi("GET", `admin/user/${id}`);
    setUser({
      name: data.name,
      firstname: data.firstname,
      email: data.email,
      plain_password: data.plain_password,
      ssh_user: data.ssh_user,
      ip_address: data.ip_address,
      role: data.roles[0],
      team: data.team,
    });
  };

  const fetchClients = async () => {
    const data = await fetchApi("GET", "admin/client");
    setClient(data);
  };

  useEffect(() => {
    fetchUser();
    fetchClients();
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
    <div className={styles.component}>
      <h1>Edit User - {id}</h1>
      <form onSubmit={onSubmit} className={styles.serverForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              placeholder="Toto"
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={user.firstname}
              placeholder="John"
              onChange={(e) => handleChange("firstname", e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="ssh_user">SSH user</label>

            <input
              type="text"
              name="ssh_user"
              id="ssh_user"
              value={user.ssh_user}
              placeholder="john"
              onChange={(e) => handleChange("ssh_user", e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ip_address">Ip Adress</label>

            <input
              type="text"
              name="ip_address"
              id="ip_address"
              value={user.ip_address}
              placeholder="192.168.1.1"
              onChange={(e) => handleChange("ip_address", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>

            <select
              name="role"
              id="role"
              value={user.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_CLIENT_ADMIN">Client</option>
              <option value="ROLE_DEVELOPER">Developper</option>
              <option value="ROLE_SUPER_ADMIN">Admin</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="team">Team</label>
            <select
              name="team"
              value={user.team}
              id="team"
              onChange={(e) => handleChange("team", e.target.value)}
            >
              <option value={0}>Sélectionnez un client</option>
              {client.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              placeholder="john@example.com"
              onChange={(e) => handleChange("email", e.target.value)}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="plain_password">Password</label>

            <input
              type="password"
              name="plain_password"
              value={user.plain_password}
              placeholder="plain_password"
              onChange={(e) => handleChange("plain_password", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Save User
          </button>
        </div>
      </form>
      {/* <form onSubmit={(e) => onSubmit(e)}>
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
      </form> */}
    </div>
  );
}
