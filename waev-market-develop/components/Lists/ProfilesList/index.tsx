"use client";
import { Card } from "@mui/material";
import MDAvatar from "../../Elements/MDAvatar";
import MDBox from "../../Elements/MDBox";
import MDButton from "../../Elements/MDButton";
import MDTypography from "../../Elements/MDTypography";

// Declaring props types for ProfilesList
interface Props {
  title: string;
  profiles: {
    image: string;
    name: string;
    description: string;
    action: {
      type: "external" | "internal";
      route: string;
      color:
        | "primary"
        | "secondary"
        | "info"
        | "success"
        | "warning"
        | "error"
        | "light"
        | "dark";
      label: string;
    };
  }[];
  shadow?: boolean;
  [key: string]: any;
}

export function ProfilesList({
  title,
  profiles,
  shadow = true,
}: Props): JSX.Element {
  const renderProfiles = profiles.map(
    ({ image, name, description, action }) => (
      <MDBox key={name} display="flex" alignItems="center" py={1} mb={1}>
        <MDBox mr={2}>
          <MDAvatar src={image} alt="something here" shadow="md" />
        </MDBox>
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <MDTypography variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox ml="auto">
          {action.type === "internal" ? (
            <MDButton to={action.route} variant="text" color="info">
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    )
  );

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow ? "none" : "" }}>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}
