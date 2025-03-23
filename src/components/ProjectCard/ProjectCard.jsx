import { useState, useEffect, useMemo, useCallback } from "react";
import cls from "./ProjectCard.module.css";
import InlineButton from "../InlineButton/InlineButton";
import { METRICS } from "../../data/metrics"; // Import METRICS

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

function ProjectCard(props) {
  const { projectName, selectedDate, color = "red" } = props;

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem(
      "metrics_" + projectName + "_" + formatDate(selectedDate)
    );
    return savedCount ? JSON.parse(savedCount) : METRICS;
  });

  useEffect(() => {
    const savedCount = localStorage.getItem(
      "metrics_" + projectName + "_" + selectedDate.toISOString().split("T")[0]
    );
    setCount(savedCount ? JSON.parse(savedCount) : METRICS);
  }, [selectedDate, projectName, count]);

  const handleButtonClick = useCallback(
    (index) => {
      const newCount = count.map((item, i) =>
        i === index ? { ...item, value: item.value + 1 } : item
      );
      setCount(newCount);
      localStorage.setItem(
        "metrics_" + projectName + "_" + formatDate(selectedDate),
        JSON.stringify(newCount)
      );
    },
    [count, projectName, selectedDate]
  );

  const handleRemoveFromStorage = () => {
    localStorage.removeItem(
      "metrics_" + projectName + "_" + selectedDate.toISOString().split("T")[0]
    );
    const newCount = count.map((item) => ({ ...item, value: 0 }));
    setCount(newCount);
  };

  const downloadJson = () => {
    const jsonString = localStorage.getItem("metrics_" + projectName);
    const blob = new Blob([jsonString ? jsonString : JSON.stringify(METRICS)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = projectName + ".json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderedMetrics = useMemo(() => {
    return count.map((metric, index) => (
      <button key={index} onClick={() => handleButtonClick(index)}>
        {metric.name}: {metric.value}
      </button>
    ));
  }, [count, handleButtonClick]);

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
        {renderedMetrics}
      </div>
    </>
  );
}

export default ProjectCard;
