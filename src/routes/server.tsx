import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";

export default function Server() {
  const fetchApi = useFetchApi();
  const [servers, setServers] = useState<any[]>([]);
  const canDelete = useCanDelete();
  const canEditAdd = useCanEditAdd();

  const fetchServer = async () => {
    const data = await fetchApi("GET", "admin/server/me");
    setServers(data);
  };

  const deleteServer = async (id: number) => {
    await fetchApi("DELETE", `admin/server/${id}`);
  };

  useEffect(() => {
    fetchServer();
  }, []);

  return (
    <div className={styles.component}>
      <div>
        <h1>Server</h1>
        {canEditAdd && <Link to="/new-server">New Server</Link>}
      </div>

      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Public IP</th>
            <th>CPU</th>
            <th>RAM</th>
            <th>Storage</th>
            {(canEditAdd || canDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id}>
              <td>{server.name}</td>
              <td>{server.public_ip}</td>
              <td>{server.cpu} cores</td>
              <td>{server.ram} Go</td>
              <td>{server.stock} Go</td>
              {(canEditAdd || canDelete) && (
                <td>
                  <div className={styles.actionsCell}>
                    {canEditAdd && (
                      <Link to={`/server/${server.id}`}>Modifier</Link>
                    )}
                    {canDelete && (
                      <button onClick={() => deleteServer(server.id)}>
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
