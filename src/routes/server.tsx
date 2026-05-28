import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";
import ServerForm from "../components/ServerForm";

export default function Server() {
  const fetchApi = useFetchApi();
  const [servers, setServers] = useState<any[]>([]);
  const canDelete = useCanDelete();
  const canEditAdd = useCanEditAdd();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const fetchServer = async () => {
    const data = await fetchApi("GET", "admin/server/me");
    setServers(data);
  };

  const deleteServer = async (id: number) => {
    await fetchApi("DELETE", `admin/server/${id}`);
    setServers((prev) => prev.filter((server) => server.id !== id));
  };

  useEffect(() => {
    fetchServer();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredServers = servers.filter((server) => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = server.name?.toLowerCase().includes(query);
    const publicIpMatch = server.public_ip?.toLowerCase().includes(query);
    const cpuMatch = server.cpu?.toString().toLowerCase().includes(query);
    const ramMatch = server.ram?.toString().toLowerCase().includes(query);
    const storageMatch = server.storage
      ?.toString()
      .toLowerCase()
      .includes(query);

    return nameMatch || publicIpMatch || cpuMatch || ramMatch || storageMatch;
  });

  return (
    <div className={styles.component}>
      {showForm && (
        <div className={styles.formContainer} onClick={toggleForm}>
          <div className={styles.formBox} onClick={(e) => e.stopPropagation()}>
            <ServerForm backToList={toggleForm} />
          </div>
        </div>
      )}
      <div>
        <h1>Servers</h1>
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
          New Server
        </button>
      </div>

      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Public IP</th>
            <th>CPU</th>
            <th>RAM</th>
            <th>Storage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServers.map((server) => (
            <tr key={server.id}>
              <td>{server.name}</td>
              <td>{server.public_ip}</td>
              <td>{server.cpu} cores</td>
              <td>{server.ram} Go</td>
              <td>{server.stock} Go</td>
              <td>
                <div className={styles.actionsCell}>
                  <Link
                    to={`/server/${server.id}`}
                    className={canEditAdd() ? "" : styles.disabledButton}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteServer(server.id)}
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
