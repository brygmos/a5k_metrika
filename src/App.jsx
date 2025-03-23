import "./App.css";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import InlineButton from "./components/InlineButton/InlineButton";
import { useState } from "react";
import { PROJECTS } from "./data/projects";
import { formatDate } from "./helpers";

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

  const handleResetAll = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`metrics_`)) {
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
      <h1>A5K Projects Metrics</h1>
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
        {PROJECTS &&
          PROJECTS.map((project) => (
            <ProjectCard
              projectName={project.name}
              color={project.color}
              key={project.name}
              selectedDate={selectedDate}
            />
          ))}
      </div>
    </>
  );
}

export default App;
