import { useState } from "react";
import { Search } from "./Search";
import { Details } from "./components/details/Details";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);

  const handleSearch = (data) => {
    setProfile(data);
  };

  return (
    <>
      <div className="hero-container">
        <Search onSearch={handleSearch} />
      </div>
      {profile && (
        <div className="hero-menu">
        <div className="hero-image">
          <img alt={profile.login} src={profile.avatar_url} />
          <h2 >{profile.name}</h2>
        </div>
          
        
        <div className="hero-info">
         <div><p className="follow">Follower <span></span> {profile.followers}</p></div>
          <div><p className="follow">Followings <span></span> {profile.following}</p></div>
          <div>
            <p className="follow">Location <span></span> {profile.location}</p>
          </div>

        </div>
     </div>
      )}
    </>
  );
}

export default App;
