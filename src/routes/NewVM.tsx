import { useState, useEffect } from "react";
import useFetchApi from "../hook/fetchApi";
import styles from "./new.module.css";

interface vmI {
  name: string;
  cpu: number;
  private_ip: string;
  server: number;
  ssh_port: number;
  os: string;
  stock: number;
  ram: number;
}

export default function NewVM() {
  const [servers, setServers] = useState<any[]>([]);
  const [vm, setVm] = useState<vmI>({
    name: "",
    cpu: 0,
    private_ip: "",
    server: 0,
    ssh_port: 0,
    os: "",
    stock: 0,
    ram: 0,
  });
  const fetchApi = useFetchApi();

  const handleChange = (key: keyof vmI, value: string) => {
    setVm((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const fetchServer = async () => {
    const data = await fetchApi("GET", "admin/server");
    setServers(data);
  };

  useEffect(() => {
    fetchServer();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("POST", "admin/vm", vm);
    console.log(data);
  };

  return (
    <div className={styles.component}>
      <h1>New Virtual Machine</h1>

      <form onSubmit={onSubmit} className={styles.serverForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={vm.name}
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
              value={vm.cpu || ""}
              placeholder="4"
              onChange={(e) => handleChange("cpu", e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="private_ip">Private IP</label>
            <input
              type="text"
              name="private_ip"
              id="private_ip"
              value={vm.private_ip}
              placeholder="192.168.1.1"
              onChange={(e) => handleChange("private_ip", e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subnet">Server</label>
            <select
              name="server"
              id="subnet"
              value={vm.server}
              onChange={(e) => handleChange("server", e.target.value)}
            >
              <option value={0}>Sélectionnez un server</option>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="ssh_port">SSH Port</label>
            <input
              type="number"
              name="ssh_port"
              id="ssh_port"
              value={vm.ssh_port || ""}
              placeholder="Ex: 22"
              onChange={(e) => handleChange("ssh_port", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="os">Operating System</label>
            <input
              type="text"
              name="os"
              id="os"
              value={vm.os}
              placeholder="Ubuntu, CentOS"
              onChange={(e) => handleChange("os", e.target.value)}
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
              value={vm.stock || ""}
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
              value={vm.ram || ""}
              placeholder="16"
              onChange={(e) => handleChange("ram", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Save Virtual Machine
          </button>
        </div>
      </form>
    </div>
  );
}
