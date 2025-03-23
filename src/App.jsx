import "./App.css";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import InlineButton from "./components/InlineButton/InlineButton";
import { useState } from "react";
import { PROJECTS } from "./data/projects"; // Import PROJECTS

function App() {
  let [selectedDate, setSelectedDate] = useState(new Date());
  const handleResetAll = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`metrics_`)) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
    console.log(event.target.value);
  };

  return (
    <>
      <h1>A5K Projects Metrics</h1>
      <input
        type="date"
        id="dateInput"
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
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
