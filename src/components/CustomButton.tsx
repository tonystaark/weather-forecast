import { Button } from "antd";

type ButtonType =
  | "link"
  | "text"
  | "ghost"
  | "default"
  | "primary"
  | "dashed"
  | undefined;

interface CustomButtonProps {
  children: string;
  type: ButtonType;
  onClickAction: () => void;
}

const CustomButton = ({
  children = "button",
  type = undefined,
  onClickAction,
}: CustomButtonProps) => {
  return (
    <Button type={type} onClick={onClickAction}>
      {children}
    </Button>
  );
};

CustomButton.defaultProps = {
  children: "button",
  type: "primary",
};

export default CustomButton;
