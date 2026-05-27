import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";

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
    <div className={styles.component}>
      <div>
        <h1>User</h1>
        {canEditAdd && <Link to="/new-user">New User</Link>}
      </div>
      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>SSH User</th>
            <th>Role</th>
            <th>Team</th>
            {(canEditAdd || canDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name} {user.firstname}</td>
              <td>{user.email}</td>
              <td>{user.ssh_user}</td>
              <td>{user.roles}</td>
              <td>{user.team.name}</td>
              {(canEditAdd || canDelete) && (
                <td>
                  <div className={styles.actionsCell}>
                    {canEditAdd && (
                      <Link to={`/user/${user.id}`}>Modifier</Link>
                    )}
                    {canDelete && (
                      <button onClick={() => deleteUser(user.id)}>
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
