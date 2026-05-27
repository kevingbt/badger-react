import { useState } from "react";
import useFetchApi from "../hook/fetchApi";

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

export default function NewServer() {
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
  const fetchApi = useFetchApi();

  const handleChange = (key: keyof serverI, value: string) => {
    setServer((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchApi("POST", "admin/server", server);
    console.log(data);
  };

  return (
    <>
      <h1>New Server</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
      </form>
    </>
  );
}
