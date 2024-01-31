import { useState, useEffect } from "react";
import axios from "axios";

import "./Search.css";

export const Search = ({ onSearch }) => {
  const [username, setUsername] = useState("github");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      onSearch(response.data);
      setProfile(response.data);
    } catch (error) {
      console.log("Error al buscar el perfil en GitHub: ", error.message);
      setError("Hubo un error al buscar el perfil en GitHub");
    }
  };

  useEffect(()=>{
    handleSearch();
  },[])
  const handleKeyDown = (e) => {
   
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  console.log(profile);

  return (
    <div
      className="search"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="input-search">
        <input
          style={{ marginTop: "5rem" }}
          name=""
          type="text"
          placeholder="Nombre de usuario GitHub"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && (
      <p style={{ color: "white", background: "tomato", borderRadius: "5px", padding: "8px" }}>
        {error}
          {setTimeout(() => {
          setError(null);
          }, 3000)}
      </p>
    )}

      {profile && (
        <div className="card-container">
          <div className="card-body">
            <img
              className="card-avatar"
              alt={profile.name}
              src={profile.avatar_url}
            />

            <div className="card-text">
              <span style={{}}>{profile.name}</span>

              <span>{profile.html_url}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
