import { useState } from "react";
import { Search } from "./Search";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);

  const handleSearch = (data) => {
    setProfile(data);
  };

  return (
    <>
      <div className="hero-image">
        <Search onSearch={handleSearch} />
      </div>
      {profile && (
        <div>
          <h2>{profile.login}</h2>
          <img alt={profile.login} src={profile.avatar_url} />
        </div>
      )}
    </>
  );
}

export default App;
