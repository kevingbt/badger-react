import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import styles from "./form.module.css";
import { useNavigate } from "react-router";

export interface userI {
  name: string;
  firstname: string;
  email: string;
  plain_password: string;
  ssh_user: string;
  ip_address: string;
  role: string;
  team?: number | string;
}

interface UserFormProps {
  userInfo?: userI;
  id?: number;
  backToList?: () => void;
}
export default function UserForm({ userInfo, id, backToList }: UserFormProps) {
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
  const [client, setClient] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    const data = await fetchApi("GET", "admin/client");
    setClient(data);
  };

  useEffect(() => {
    fetchClients();
    if (userInfo) setUser(userInfo);
  }, [userInfo]);

  const fetchApi = useFetchApi();
  const [error, setError] = useState("");

  const handleChange = (key: keyof userI, value: string) => {
    setUser((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      if (userInfo) {
        await fetchApi("PATCH", `admin/user/${id}`, user);
        setError("User updated successfully!");
        navigate("/user");
      } else {
        await fetchApi("POST", "admin/user", user);
        setError("User created successfully!");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <h1>{userInfo ? "Edit User" : "New User"}</h1>
        {!userInfo && (
          <button onClick={backToList} className={styles.backButton}>
            Back to List
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className={styles.Form}>
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
              required
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
              required
            />
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}
