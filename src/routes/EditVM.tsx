import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
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

export default function EditVM() {
  const [servers, setServers] = useState<any[]>([]);

  const fetchApi = useFetchApi();
  const { id } = useParams();
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

  const fetchVm = async () => {
    const data = await fetchApi("GET", `admin/vm/${id}`);
    setVm({
      name: data.name,
      cpu: data.cpu,
      private_ip: data.private_ip,
      server: data.server.id,
      ssh_port: data.ssh_port,
      os: data.os,
      stock: data.stock,
      ram: data.ram,
    });
  };

  const fetchServer = async () => {
    const data = await fetchApi("GET", "admin/server");
    setServers(data);
  };

  useEffect(() => {
    fetchVm();
    fetchServer();
  }, []);

  const handleChange = (key: keyof vmI, value: string) => {
    setVm((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("PATCH", `admin/vm/${id}`, vm);
    console.log(data);
  };

  return (
    <div className={styles.component}>
      <h1>Edit Virtual Machine - {id}</h1>
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
      {/* <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={vm.name}
            placeholder="nom"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label htmlFor="cpu">CPU</label>
          <input
            type="number"
            name="cpu"
            value={vm.cpu}
            placeholder="cpu"
            onChange={(e) => handleChange("cpu", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="private_ip">IP Privée</label>
          <input
            type="text"
            name="private_ip"
            value={vm.private_ip}
            placeholder="private_ip"
            onChange={(e) => handleChange("private_ip", e.target.value)}
          />
          <label htmlFor="server">Server</label>
          <select
            name="server"
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
        <div>
          <label htmlFor="ssh_port">Port SSH</label>
          <input
            type="number"
            name="ssh_port"
            value={vm.ssh_port}
            placeholder="ssh_port"
            onChange={(e) => handleChange("ssh_port", e.target.value)}
          />
          <label htmlFor="os">Système d'exploitation</label>
          <input
            type="text"
            name="os"
            value={vm.os}
            placeholder="os"
            onChange={(e) => handleChange("os", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            value={vm.stock}
            placeholder="stock"
            onChange={(e) => handleChange("stock", e.target.value)}
          />
          <label htmlFor="ram">RAM</label>
          <input
            type="number"
            name="ram"
            value={vm.ram}
            placeholder="ram"
            onChange={(e) => handleChange("ram", e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form> */}
    </div>
  );
}
