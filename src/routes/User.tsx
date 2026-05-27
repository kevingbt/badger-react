import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";

export default function User() {
  const fetchApi = useFetchApi();
  const [users, setUsers] = useState<any[]>([]);
  const canDelete = useCanDelete();
  const canEditAdd = useCanEditAdd();

  const fetchUser = async () => {
    const data = await fetchApi("GET", "admin/user/me");
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    await fetchApi("DELETE", `admin/user/${id}`);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1>User</h1>
      {canEditAdd && <Link to="/new-user">ajouter user</Link>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            {canEditAdd && <Link to={`/user/${user.id}`}>modifier</Link>}
            {canDelete && (
              <button onClick={() => deleteUser(user.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
