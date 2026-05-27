import { useState, useEffect } from "react";
import useFetchApi from "../hook/fetchApi";

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
    <>
      <h1>New Virtual Machine</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
      </form>
    </>
  );
}
