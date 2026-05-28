import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
import ServerForm, { serverI } from "../components/ServerForm";

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

  return (
    <ServerForm serverInfo={server} id={Number(id)} />
  );
}
