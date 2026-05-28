import { useEffect, useState } from "react";
import useFetchApi from "../hook/fetchApi";
import { Link } from "react-router";
import useCanDelete from "../hook/useCanDelete";
import useCanEditAdd from "../hook/useCanEditAdd";
import styles from "./component.module.css";
import UserForm from "../components/UserForm";

export default function User() {
  const fetchApi = useFetchApi();
  const [users, setUsers] = useState<any[]>([]);
  const canDelete = useCanDelete();
  const canEditAdd = useCanEditAdd();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const fetchUser = async () => {
    const data = await fetchApi("GET", "admin/user/me");
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    await fetchApi("DELETE", `admin/user/${id}`);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredUsers = users.filter((user) => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = user.name?.toLowerCase().includes(query);
    const firstnameMatch = user.firstname?.toLowerCase().includes(query);
    const emailMatch = user.email?.toLowerCase().includes(query);
    const sshMatch = user.ssh_user?.toLowerCase().includes(query);
    const roleMatch = user.roles.some((role) =>
      role?.toLowerCase().includes(query),
    );
    const teamMatch = user.team?.name?.toLowerCase().includes(query);

    return (
      nameMatch ||
      firstnameMatch ||
      emailMatch ||
      sshMatch ||
      roleMatch ||
      teamMatch
    );
  });

  return (
    <div className={styles.component}>
      {showForm && (
        <div className={styles.formContainer} onClick={toggleForm}>
          <div className={styles.formBox} onClick={(e) => e.stopPropagation()}>
            <UserForm backToList={toggleForm} />
          </div>
        </div>
      )}
      <div>
        <h1>Users</h1>
        <input
          type="text"
          placeholder="Search by name, email, role..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={toggleForm}
          className={canEditAdd() ? "" : styles.disabledButton}
        >
          New User
        </button>
      </div>
      <table className={styles.serverTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>SSH User</th>
            <th>Role</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.name} {user.firstname}
              </td>
              <td>{user.email}</td>
              <td>{user.ssh_user}</td>
              <td>{user.roles}</td>
              <td>{user.team?.name || ""}</td>
              <td>
                <div className={styles.actionsCell}>
                  <Link
                    to={`/user/${user.id}`}
                    className={canEditAdd() ? "" : styles.disabledButton}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
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
