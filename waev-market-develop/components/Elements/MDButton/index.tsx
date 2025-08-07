"use client";
import { FC, ReactNode, forwardRef } from "react";
import { ButtonProps } from "@mui/material";

// Custom styles for MDButton
import MDButtonRoot from "./MDButtonRoot";

// Waev Dashboard contexts
import { useMaterialUIController } from "../../../contexts/styles";

// Declaring props types for MDButton
interface Props extends Omit<ButtonProps, "color" | "variant"> {
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "default";
  variant?: "text" | "contained" | "outlined" | "gradient";
  size?: "small" | "medium" | "large";
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const MDButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      color = "white",
      variant = "contained",
      size = "medium",
      circular = false,
      iconOnly = false,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </MDButtonRoot>
    );
  }
);

export default MDButton;
