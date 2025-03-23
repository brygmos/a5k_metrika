import { useState } from "react";
import cls from "./ProjectCard.module.css";
import InlineButton from "../InlineButton/InlineButton";

const METRICS = [
  { name: "Поднятие реги", value: 0 },
  { name: "Поднятие ГЛК", value: 0 },
  { name: "Поднятие ЛЛК", value: 0 },
  { name: "Учетки", value: 0 },
  { name: "Письма", value: 0 },
  { name: "Рассылки", value: 0 },
  { name: "АПИ", value: 0 },
  { name: "Доработки ТЗ реги", value: 0 },
  { name: "Доработки ТЗ ГЛК", value: 0 },
  { name: "Доработки ТЗ ЛЛК", value: 0 },
  { name: "Доработки ТЗ Учетки", value: 0 },
  { name: "Доработки Письма", value: 0 },
  { name: "Исправление ошибок", value: 0 },
  { name: "Документы", value: 0 },
];

function ProjectCard(props) {
  const { projectName = "projectName", color = "red" } = props;
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("metrics_" + projectName);
    return savedCount ? JSON.parse(savedCount) : METRICS;
  });

  const handleButtonClick = (index) => {
    const newCount = count.map((item, i) =>
      i === index ? { ...item, value: item.value + 1 } : item
    );
    setCount(newCount);
    localStorage.setItem("metrics_" + projectName, JSON.stringify(newCount));
  };

  const handleRemoveFromStorage = () => {
    localStorage.removeItem("metrics_" + projectName);
    const newCount = count.map((item) => ({ ...item, value: 0 }));
    setCount(newCount);
  };

  const downloadJson = () => {
    const jsonString = JSON.stringify(
      localStorage.getItem("metrics_" + projectName),
      null,
      2
    );
    const blob = new Blob([JSON.parse(jsonString)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = projectName + ".json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className={cls.card} style={{ color: color }}>
        <h3>{projectName}</h3>
        <p className={cls.removeFromStorageParagraph}>
          <InlineButton
            handleClick={handleRemoveFromStorage}
            color="grey"
            hoverColor="red"
          >
            reset
          </InlineButton>
        </p>
        <p className={cls.removeFromStorageParagraph}>
          <InlineButton handleClick={downloadJson} hoverColor="lightblue">
            JSON
          </InlineButton>
        </p>
        {count &&
          count.map((metric, index) => (
            <button key={index} onClick={() => handleButtonClick(index)}>
              {metric.name}: {metric.value}
            </button>
          ))}
      </div>
    </>
  );
}

export default ProjectCard;
