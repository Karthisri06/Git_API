import React, { useEffect, useState } from "react";
import axios from "axios";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
}

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingRepoId, setEditingRepoId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Repo>>({});


  const fetchRepos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/repos");
      setRepos(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Couldn't fetch repos:", error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/check";
  };

  const startEditing = (repo: Repo) => {
    setEditingRepoId(repo.id);
    setEditForm(repo); 
  };

  
  const cancelEditing = () => {
    setEditingRepoId(null);
    setEditForm({});
  };

  const saveChanges = async (id: number) => {
    try {
      await axios.put(`http://localhost:3000/auth/repos/${id}`, editForm);
      setEditingRepoId(null);
      fetchRepos();
    } catch (error) {
      console.error("Couldn't save changes:", error);
    }
  };

 
  const deleteRepo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/auth/repos/${id}`);
      fetchRepos();
    } catch (error) {
      console.error("Couldn't delete repo:", error);
    }
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>GitHub Repositories</h1>

      {!isLoggedIn && (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}

      {isLoggedIn && repos.length > 0 && (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Full Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Pushed At</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {repos.map((repo) => {
              const isEditing = editingRepoId === repo.id;

              return (
                <tr key={repo.id}>
                  <td>{repo.id}</td>

                  {isEditing ? (
                    <>
                      <td>
                        <input
                          name="name"
                          value={editForm.name || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          name="full_name"
                          value={editForm.full_name || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="created_at"
                          value={editForm.created_at?.slice(0, 10) || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="updated_at"
                          value={editForm.updated_at?.slice(0, 10) || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="pushed_at"
                          value={editForm.pushed_at?.slice(0, 10) || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          name="language"
                          value={editForm.language || ""}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <button onClick={() => saveChanges(repo.id)}>Save</button>
                        <button onClick={cancelEditing}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{repo.name}</td>
                      <td>{repo.full_name}</td>
                      <td>{new Date(repo.created_at).toLocaleDateString()}</td>
                      <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                      <td>{new Date(repo.pushed_at).toLocaleDateString()}</td>
                      <td>{repo.language}</td>
                      <td>
                        <button onClick={() => startEditing(repo)}>Edit</button>
                        <button onClick={() => deleteRepo(repo.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;



