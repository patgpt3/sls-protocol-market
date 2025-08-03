"use client";
import { FC, forwardRef } from "react";
import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";

// Custom styles for MDInput
import MDInputRoot from "./MDInputRoot";

// Declaring props types for MDInput
interface Props
  extends Omit<OutlinedTextFieldProps | StandardTextFieldProps, "variant"> {
  variant?: "standard" | "outlined";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

const MDInput: FC<Props | any> = forwardRef(
  (
    {
      error = false,
      success = false,
      disabled = false,
      autoComplete = "off",
      ...rest
    },
    ref
  ) => (
    <MDInputRoot
      inputProps={{
        autoComplete,
      }}
      {...rest}
      ref={ref}
      ownerState={{ error, success, disabled }}
    />
  )
);

MDInput.displayName = "MDInput";

export default MDInput;
