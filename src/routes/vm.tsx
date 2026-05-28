import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import useCanDelete from "../hook/useCanDelete";
import { Link } from "react-router";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";
import VmForm from "../components/VmForm";

export default function Vm() {
  const fetchApi = useFetchApi();
  const canDelete = useCanDelete();
  const [vms, setVms] = useState<any[]>([]);
  const canEditAdd = useCanEditAdd();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const fetchVm = async () => {
    const data = await fetchApi("GET", "admin/vm/me");
    setVms(data);
  };

  const deleteVm = async (id: number) => {
    await fetchApi("DELETE", `admin/vm/${id}`);
    setVms((prev) => prev.filter((vm) => vm.id !== id));
  };

  useEffect(() => {
    fetchVm();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredVms = vms.filter((vm) => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = vm.name?.toLowerCase().includes(query);
    const publicIpMatch = vm.public_ip?.toLowerCase().includes(query);
    const serverMatch = vm.server?.name?.toLowerCase().includes(query);
    const servicesMatch = vm.services?.some((service) =>
      service.name?.toLowerCase().includes(query),
    );

    return nameMatch || publicIpMatch || serverMatch || servicesMatch;
  });

  return (
    <div className={styles.component}>
      {showForm && (
        <div className={styles.formContainer} onClick={toggleForm}>
          <div className={styles.formBox} onClick={(e) => e.stopPropagation()}>
            <VmForm backToList={toggleForm} />
          </div>
        </div>
      )}
      <div>
        <h1>Virtual Machines</h1>
        <input
          type="text"
          placeholder="Search by name, public IP, CPU..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={toggleForm}
          className={canEditAdd() ? "" : styles.disabledButton}
        >
          New Virtual Machine
        </button>
      </div>
      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Server</th>
            <th>Public IP</th>
            <th>Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVms.map((vm) => (
            <tr key={vm.id}>
              <td>{vm.name}</td>
              <td>{vm.server.name}</td>
              <td>{vm.public_ip}</td>
              <td>{vm.services[0]?.name || ""}</td>
              <td>
                <div className={styles.actionsCell}>
                  <Link
                    to={`/vm/${vm.id}`}
                    className={canEditAdd() ? "" : styles.disabledButton}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteVm(vm.id)}
                    className={canDelete() ? "" : styles.disabledButton}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
