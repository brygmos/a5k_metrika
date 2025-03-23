import "./App.css";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import InlineButton from "./components/InlineButton/InlineButton";
import { Fragment, useState } from "react";
import { formatDate, getProjects } from "./helpers";

const getInitialDate = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date");
  let initialDate = dateParam ? new Date(dateParam) : new Date();
  if (!dateParam) {
    urlParams.set("date", formatDate());
    window.history.replaceState(null, "", `?${urlParams.toString()}`);
  }
  return initialDate;
};

function App() {
  let [selectedDate, setSelectedDate] = useState(getInitialDate());
  let [projects, setProjects] = useState(getProjects());
  let [isAddingProject, setIsAddingProject] = useState(false);
  let [newProjectName, setNewProjectName] = useState("");
  let [newProjectColor, setNewProjectColor] = useState("");

  const handleAddProject = () => {
    const newProject = { name: newProjectName, color: newProjectColor };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("metrics_projects", JSON.stringify(updatedProjects));
    setNewProjectName("");
    setNewProjectColor("");
    setIsAddingProject(false);
  };

  const handleRemoveProject = (projectName) => {
    const updatedProjects = projects.filter(
      (project) => projectName !== project.name
    );
    setProjects(updatedProjects);
    localStorage.setItem("metrics_projects", JSON.stringify(updatedProjects));
  };

  const handleResetAll = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`metrics_`) && !key.startsWith(`metrics_projects`)) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  };

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("date", formatDate(newDate));
    window.history.replaceState(null, "", `?${urlParams.toString()}`);
  };

  return (
    <>
      <h1>
        A5K Projects Metrics{" "}
        {isAddingProject ? (
          <InlineButton
            handleClick={() => setIsAddingProject(false)}
            color="grey"
            hoverColor="white"
          >
            -
          </InlineButton>
        ) : (
          <InlineButton
            handleClick={() => setIsAddingProject(true)}
            color="grey"
            hoverColor="white"
          >
            +
          </InlineButton>
        )}
        {isAddingProject && (
          <span className="inputsInlineContainer">
            <input
              type="text"
              placeholder="name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <input
              type="text"
              placeholder="color"
              value={newProjectColor}
              onChange={(e) => setNewProjectColor(e.target.value)}
            />
            <InlineButton
              handleClick={handleAddProject}
              color="green"
              hoverColor="lightgreen"
            >
              v
            </InlineButton>
          </span>
        )}
      </h1>
      <div className="toolbar">
        <input
          type="date"
          id="dateInput"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onChange={handleDateChange}
        />
        <p>
          <InlineButton
            handleClick={handleResetAll}
            color="grey"
            hoverColor="red"
          >
            reset all
          </InlineButton>
        </p>
      </div>
      <div className="projects">
        {projects &&
          projects.map((project) => (
            <ProjectCard
              projectName={project.name}
              color={project.color}
              key={project.name}
              selectedDate={selectedDate}
              handleRemoveProject={handleRemoveProject}
            />
          ))}
      </div>
    </>
  );
}

export default App;
