import { PROJECTS } from "../data/projects";

export function formatDate(date) {
  let inputDate;
  if (!date || isNaN(new Date(date).getTime())) {
    inputDate = new Date();
  } else {
    inputDate = new Date(date);
  }
  const formattedDate = inputDate.toISOString().split("T")[0];
  return formattedDate;
}

export function getProjects() {
  let projects = localStorage.getItem("metrics_projects");
  return projects ? JSON.parse(projects) : PROJECTS;
}

export function addProject() {
  let projects = localStorage.getItem("metrics_projects");
  return projects ? projects : PROJECTS;
}
