import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
import styles from "./new.module.css";

interface serverI {
  name: string;
  cpu: number;
  public_ip: string;
  subnet: string;
  ssh_port: number;
  hypervisor: string;
  stock: number;
  ram: number;
}
export default function EditServer() {
  const fetchApi = useFetchApi();
  const { id } = useParams();
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

  const fetchServer = async () => {
    const data = await fetchApi("GET", `admin/server/${id}`);
    setServer({
      name: data.name,
      cpu: data.cpu,
      public_ip: data.public_ip,
      subnet: data.subnet,
      ssh_port: data.ssh_port,
      hypervisor: data.hypervisor,
      stock: data.stock,
      ram: data.ram,
    });
  };

  useEffect(() => {
    fetchServer();
  }, []);

  const handleChange = (key: keyof serverI, value: string) => {
    setServer((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("PATCH", `admin/server/${id}`, server);
    console.log(data);
  };

  return (
    <div className={styles.component}>
      <h1>Edit Server - {id}</h1>
      <form onSubmit={onSubmit} className={styles.serverForm}>
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

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Save Server
          </button>
        </div>
      </form>
      {/* <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={server.name}
            placeholder="nom"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label htmlFor="cpu">CPU</label>
          <input
            type="number"
            name="cpu"
            value={server.cpu}
            placeholder="cpu"
            onChange={(e) => handleChange("cpu", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="public_ip">IP Public</label>
          <input
            type="text"
            name="public_ip"
            value={server.public_ip}
            placeholder="public_ip"
            onChange={(e) => handleChange("public_ip", e.target.value)}
          />
          <label htmlFor="subnet">Sous-réseau</label>
          <input
            type="text"
            name="subnet"
            value={server.subnet}
            placeholder="subnet"
            onChange={(e) => handleChange("subnet", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ssh_port">Port SSH</label>
          <input
            type="number"
            name="ssh_port"
            value={server.ssh_port}
            placeholder="ssh_port"
            onChange={(e) => handleChange("ssh_port", e.target.value)}
          />
          <label htmlFor="hypervisor">Hyperviseur</label>
          <input
            type="text"
            name="hypervisor"
            value={server.hypervisor}
            placeholder="hypervisor"
            onChange={(e) => handleChange("hypervisor", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            value={server.stock}
            placeholder="stock"
            onChange={(e) => handleChange("stock", e.target.value)}
          />
          <label htmlFor="ram">RAM</label>
          <input
            type="number"
            name="ram"
            value={server.ram}
            placeholder="ram"
            onChange={(e) => handleChange("ram", e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form> */}
    </div>
  );
}
