import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { useParams } from "react-router";
import VmForm, { vmI } from "../components/VmForm";

export default function EditVM() {
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

  useEffect(() => {
    fetchVm();
  }, []);

  return <VmForm vmInfo={vm} id={Number(id)} />;
}
