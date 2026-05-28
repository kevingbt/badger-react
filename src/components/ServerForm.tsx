import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import styles from "./form.module.css";
import { useNavigate } from "react-router";

export interface serverI {
  name: string;
  cpu: number;
  public_ip: string;
  subnet: string;
  ssh_port: number;
  hypervisor: string;
  stock: number;
  ram: number;
}

interface ServerFormProps {
  serverInfo?: serverI;
  id?: number;
  backToList?: () => void;
}
export default function ServerForm({
  serverInfo,
  id,
  backToList,
}: ServerFormProps) {
  const [server, setServer] = useState<serverI>({
    name: "",
    cpu: 0,
    public_ip: "",
    subnet: "",
    ssh_port: 0,
    hypervisor: "",
    stock: 0,
    ram: 0,
  });

  useEffect(() => {
    if (serverInfo) setServer(serverInfo);
  }, [serverInfo]);

  const fetchApi = useFetchApi();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key: keyof serverI, value: string) => {
    setServer((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      if (serverInfo) {
        await fetchApi("PATCH", `admin/server/${id}`, server);
        setError("Server updated successfully!");
        navigate("/server");
      } else {
        await fetchApi("POST", "admin/server", server);
        setError("Server created successfully!");
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
        <h1>{serverInfo ? "Edit Server" : "New Server"}</h1>
        {!serverInfo && (
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
              value={server.name}
              placeholder="Naboo"
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cpu">CPU (Cores)</label>
            <input
              type="number"
              name="cpu"
              id="cpu"
              value={server.cpu || ""}
              placeholder="4"
              onChange={(e) => handleChange("cpu", e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="public_ip">Public IP</label>
            <input
              type="text"
              name="public_ip"
              id="public_ip"
              value={server.public_ip}
              placeholder="192.168.1.1"
              onChange={(e) => handleChange("public_ip", e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subnet">Subnet</label>
            <input
              type="text"
              name="subnet"
              id="subnet"
              value={server.subnet}
              placeholder="255.255.255.0"
              onChange={(e) => handleChange("subnet", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="ssh_port">SSH Port</label>
            <input
              type="number"
              name="ssh_port"
              id="ssh_port"
              value={server.ssh_port || ""}
              placeholder="22"
              onChange={(e) => handleChange("ssh_port", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hypervisor">Hypervisor</label>
            <input
              type="text"
              name="hypervisor"
              id="hypervisor"
              value={server.hypervisor}
              placeholder="Proxmox, VMware"
              onChange={(e) => handleChange("hypervisor", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="stock">Storage (Go)</label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={server.stock || ""}
              placeholder="100"
              onChange={(e) => handleChange("stock", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ram">RAM (Go)</label>
            <input
              type="number"
              name="ram"
              id="ram"
              value={server.ram || ""}
              placeholder="16"
              onChange={(e) => handleChange("ram", e.target.value)}
            />
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Save Server
          </button>
        </div>
      </form>
    </div>
  );
}
