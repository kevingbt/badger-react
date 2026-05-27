import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";

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
    <>
      <h1>Server</h1>
      {canEditAdd && <Link to="/new-server">ajouter server</Link>}

      <ul>
        {servers.map((server) => (
          <li key={server.id}>
            {server.name}
            {canEditAdd && <Link to={`/server/${server.id}`}>modifier</Link>}
            {canDelete && (
              <button onClick={() => deleteServer(server.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
