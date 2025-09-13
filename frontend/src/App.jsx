import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", email: "", birthday: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users", form);
      setForm({ name: "", age: "", email: "", birthday: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${editing.id}`, form);
      setEditing(null);
      setForm({ name: "", age: "", email: "", birthday: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEdit = (user) => {
    setEditing(user);
    setForm(user);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white shadow rounded p-4 w-100" style={{ maxWidth: "900px" }}>
        <h2 className="mb-4 text-center">Dashboard</h2>

        {/* Form */}
        <form className="row g-3 mb-4" onSubmit={editing ? updateUser : addUser}>
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={form.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => {
                  setEditing(null);
                  setForm({ name: "", age: "", email: "", birthday: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Users Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.birthday}</td>
                    <td className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
