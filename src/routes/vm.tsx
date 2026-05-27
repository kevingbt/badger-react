import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import useCanDelete from "../hook/useCanDelete";
import { Link } from "react-router";
import useCanEditAdd from "../hook/useCanEditAdd";

export default function Vm() {
  const fetchApi = useFetchApi();
  const canDelete = useCanDelete();
  const [vms, setVms] = useState<any[]>([]);
  const canEditAdd = useCanEditAdd();

  const fetchVm = async () => {
    const data = await fetchApi("GET", "admin/vm/me");
    setVms(data);
  };

  const deleteVm = async (id: number) => {
    const data = await fetchApi("DELETE", `admin/vm/${id}`);
    console.log(data);
  };

  useEffect(() => {
    fetchVm();
  }, []);

  return (
    <>
      <h1>Virtual Machine</h1>
      {canEditAdd && <Link to="/new-vm">ajouter vm</Link>}
      <ul>
        {vms.map((vm) => (
          <li key={vm.id}>
            {vm.name}
            {canEditAdd && <Link to={`/vm/${vm.id}`}>modifier</Link>}
            {canDelete && (
              <button onClick={() => deleteVm(vm.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
