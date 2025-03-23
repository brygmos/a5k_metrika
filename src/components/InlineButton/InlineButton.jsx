import cls from "./InlineButton.module.css";

function InlineButton(props) {
  const { color = "gray", hoverColor = "blue", handleClick, children } = props;

  return (
    <span
      onMouseOver={(e) => (e.target.style.color = hoverColor)}
      onMouseOut={(e) => (e.target.style.color = color)}
      style={{ color: color }}
      className={cls.inlineButton}
      onClick={handleClick}
    >
      {children}
    </span>
  );
}

export default InlineButton;
