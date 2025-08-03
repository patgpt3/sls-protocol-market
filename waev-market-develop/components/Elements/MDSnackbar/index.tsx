"use client";
/* eslint-disable react/default-props-match-prop-types */
import { ReactNode } from "react";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { SnackbarProps } from "@mui/material";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

// Custom styles for the MDSnackbar
import MDSnackbarIconRoot from "./MDSnackbarIconRoot";

// Waev Dashboard context
import { useMaterialUIController } from "../../../contexts/styles";

// Declaring props types for MDSnackbar
interface Props extends SnackbarProps {
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "light";
  icon: ReactNode;
  title: string;
  dateTime: string;
  content: string;
  close: () => void;
  bgWhite?: boolean;
  [key: string]: any;
}

function MDSnackbar({
  color = "info",
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite = false,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  let titleColor: any;
  let dateTimeColor: any;
  let dividerColor: any;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = darkMode ? "inherit" : "dark";
    dateTimeColor = darkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={<CloseIcon onClick={close} />}
    >
      <MDBox
        variant={bgWhite ? "contained" : "gradient"}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: "#202A3F",
        }}
      >
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            {/* @ts-ignore */}
            <MDSnackbarIconRoot
              fontSize="small"
              ownerState={{ color, bgWhite }}
            >
              {color === "success" ? (
                <CheckIcon color="success" />
              ) : (
                <ErrorIcon color="error" />
              )}
            </MDSnackbarIconRoot>
            <MDTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <MDTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </MDTypography>
            <CloseIcon
              sx={{
                color: "#FFF",
                // color: ({ palette: { dark, white } }) =>
                //   (bgWhite && !darkMode) || color === 'light' ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) =>
                  fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            />
          </MDBox>
        </MDBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <MDBox
          p={1.5}
          sx={{
            // fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette }: { palette: any }) => {
              let colorValue =
                bgWhite || color === "light"
                  ? palette.text.main
                  : palette.white.main;

              if (darkMode) {
                colorValue = color === "light" ? "inherit" : palette.white.main;
              }

              return colorValue;
            },
          }}
        >
          {content}
        </MDBox>
      </MDBox>
    </Snackbar>
  );
}

export default MDSnackbar;
