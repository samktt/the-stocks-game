import React, { ReactNode, useState } from "react";

interface ButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
  width?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  backgroundColor: initialBackgroundColor = "#508991",
  color: initialColor = "white",
  width = "200px",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        backgroundColor: isHovered ? "white" : initialBackgroundColor,
        color: isHovered ? "black" : initialColor,
        width,
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        height: "50px",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
