import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import useCanDelete from "../hook/useCanDelete";
import { Link } from "react-router";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";

export default function Vm() {
  const fetchApi = useFetchApi();
  const canDelete = useCanDelete();
  const [vms, setVms] = useState<any[]>([]);
  const canEditAdd = useCanEditAdd();

  const fetchVm = async () => {
    const data = await fetchApi("GET", "admin/vm/me");
    setVms(data);
    console.log(data);
  };

  const deleteVm = async (id: number) => {
    const data = await fetchApi("DELETE", `admin/vm/${id}`);
    console.log(data);
  };

  useEffect(() => {
    fetchVm();
  }, []);

  return (
    <div className={styles.component}>
      <div>
        <h1>Virtual Machine</h1>
        {canEditAdd && <Link to="/new-vm">New Virtual Machine</Link>}
      </div>
      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Server</th>
            <th>Public IP</th>
            <th>Service</th>
            {(canEditAdd || canDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {vms.map((vm) => (
            <tr key={vm.id}>
              <td>{vm.name}</td>
              <td>{vm.server.name}</td>
              <td>{vm.public_ip}</td>
              <td>{vm.services[0]?.name || ""}</td>
              {(canEditAdd || canDelete) && (
                <td>
                  <div className={styles.actionsCell}>
                    {canEditAdd && (
                      <Link to={`/vm/${vm.id}`}>Modifier</Link>
                    )}
                    {canDelete && (
                      <button onClick={() => deleteVm(vm.id)}>
                        Supprimer
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
