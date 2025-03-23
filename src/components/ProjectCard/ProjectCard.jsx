import { useState, useEffect, useMemo, useCallback } from "react";
import cls from "./ProjectCard.module.css";
import InlineButton from "../InlineButton/InlineButton";
import { METRICS } from "../../data/metrics";
import { formatDate } from "../../helpers";

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
      "metrics_" + projectName + "_" + formatDate(selectedDate)
    );
    setCount(savedCount ? JSON.parse(savedCount) : METRICS);
  }, [selectedDate, projectName]);

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
      "metrics_" + projectName + "_" + formatDate(selectedDate)
    );
    const newCount = count.map((item) => ({ ...item, value: 0 }));
    setCount(newCount);
  };

  const downloadJson = () => {
    const name = "metrics_" + projectName + "_" + formatDate(selectedDate);
    console.log(name);
    const jsonString = localStorage.getItem(name);
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
        <div className={cls.card_header}>
          <h3>{projectName}</h3>
          <div className={cls.card_toolbar}>
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
          </div>
        </div>
        {renderedMetrics}
      </div>
    </>
  );
}

export default ProjectCard;
