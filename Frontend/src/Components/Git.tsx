import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getRepos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/repos");
      setRepos(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost3000/auth/check";
  };

  useEffect(() => {
    getRepos();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.id}</td>
                <td>{repo.name}</td>
                <td>{repo.full_name}</td>
                <td>{new Date(repo.created_at).toLocaleDateString()}</td>
                <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                <td>{new Date(repo.pushed_at).toLocaleDateString()}</td>
                <td>{repo.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;


