import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";

import { TbGitFork } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { FaFileShield } from "react-icons/fa6";

import { Search } from "./Search";

import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState(null);

  const handleSearch = (data) => {
    setProfile(data);
  };

  const handleRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${profile.login}/repos`
      );
      const repositories = response.data;

      const projects = repositories.filter((repo) => repo.has_projects);
      setProjects(projects);
      console.log(projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRepos();
  }, [profile]);

  const formatToYearMonthDay = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  return (
    <>
      <div className="hero-search">
        <Search onSearch={handleSearch} />
      </div>
      {profile && (
        <>
          <div className="hero-menu">
            <div className="hero-image">
              <img alt={profile.login} src={profile.avatar_url} />
              <h2>{profile.name}</h2>
              <p>{profile.bio}</p>
            </div>

            <div className="hero-info">
              <div>
                <p className="follow">
                  Follower <span></span> {profile.followers}
                </p>
              </div>
              <div>
                <p className="follow">
                  Followings <span></span> {profile.following}
                </p>
              </div>
              <div>
                <p className="follow">
                  Location <span></span> {profile.location}
                </p>
              </div>
            </div>
          </div>

        
            {projects && (
              <div className="two-columns">
                {projects.map((project) => (
                  <div className="card-content" key={project.id}>
                    <div className="card-body">
                      <div className="card-text">
                        <span className="card-text-title">{project.name}</span>
                        <span className="card-text-body">{project.git_url}</span>
                        <span className="card-text-body">Created at: {formatToYearMonthDay(project.created_at)}</span>
                        <span className="card-text-footer">
                          <span><TbGitFork  size={14} style={{marginRight: "4px"}}/>{project.forks}</span>
                          <span><FaRegStar  size={14}  style={{marginRight: "4px"}}/>{project.stargazers_count}</span>
                          <span><FaFileShield size={14} style={{marginRight: "4px"}} />{project.licence}</span>
                          <span>Updated {formatDistanceToNow(project.updated_at)}</span>
                          </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            )}

        
        </>
      )}
    </>
  );
}

export default App;
