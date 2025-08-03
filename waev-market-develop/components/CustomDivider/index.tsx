"use client";

import { Divider } from "@mui/material";

export function CustomDivider() {
  return (
    <Divider
      sx={{
        borderTop: "0px solid rgba(0, 0, 0, 0.12)",
        borderRight: "0px solid rgba(0, 0, 0, 0.12)",
        borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
        backgroundColor: "transparent",
        height: "0.0625rem",
        margin: "0.5rem 0px",
        borderBottom: "none",
        opacity: "0.25",
        backgroundImage:
          "linear-gradient(to right, rgba(52, 71, 103, 0), rgb(255, 255, 255), rgba(52, 71, 103, 0)) !important",
      }}
    />
  );
}
