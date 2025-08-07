// Waev Dashboard components
import MDBox from "../Elements/MDBox";
import MDTypography from "../Elements/MDTypography";
import MDAvatar from "../Elements/MDAvatar";
import MDButton from "../Elements/MDButton";
import { Icon } from "@mui/material";
import Link from "next/link";

// Declaring props types for QuickInfoActionCard
export interface QuickInfoActionCardProps {
  image: string | JSX.Element;
  bg?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  name?: string;
  description?: string | string[] | JSX.Element;
  subDescription?: string | string[] | JSX.Element;
  descriptionIcon?: string | JSX.Element;

  route?: string;
  onClick?: React.MouseEventHandler;
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  label?: string | JSX.Element;
  link?: string;
  linkLabel?: string | JSX.Element;
  isHideButton?: boolean;
  isDisabled?: boolean;
  index?: string;
  sx?: any;
  descriptionWeight?: string;
}

export function QuickInfoActionCard({
  image,
  bg,
  name,
  description,
  subDescription,
  descriptionIcon,
  isDisabled,
  route,
  onClick,
  color,
  isHideButton,
  label,
  link,
  linkLabel,
  index,
  sx,
  descriptionWeight,
}: QuickInfoActionCardProps): JSX.Element {
  const formattedDescription = () => {
    switch (typeof description) {
      case "string": {
        return (
          <MDTypography
            variant="caption"
            fontWeight={descriptionWeight || "bold"}
            color="text"
            data-testid="quick-info-description"
          >
            {description}
          </MDTypography>
        );
      }
      case "object": {
        return (
          <>
            {/* @ts-ignore */}
            {description?.map((name, i) => (
              <MDBox display="flex" alignItems="center" key={`DescLink-${i}`}>
                <MDTypography
                  variant="button"
                  color="text"
                  lineHeight={1}
                  // sx={{ mt: 0.15, mr: 0.5 }}
                  sx={{ mt: 0.15, mr: 0.5 }}
                >
                  <Icon>{descriptionIcon || "link"}</Icon>
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {name}
                </MDTypography>
              </MDBox>
            ))}
          </>
        );
      }
      default: {
        return description;
      }
    }
  };
  const formattedSubDescription = () => {
    switch (typeof subDescription) {
      case "string": {
        return (
          <MDTypography
            variant="caption"
            color="text"
            data-testid="quick-info-sub-description"
          >
            {subDescription}
          </MDTypography>
        );
      }
      case "object": {
        return (
          <>
            {/* @ts-ignore */}
            {subDescription?.map((name, i) => (
              <MDBox display="flex" alignItems="center" key={`DescLink-${i}`}>
                <MDTypography
                  variant="button"
                  color="text"
                  lineHeight={1}
                  // sx={{ mt: 0.15, mr: 0.5 }}
                  sx={{ mt: 0.15, mr: 0.5 }}
                >
                  <Icon>{descriptionIcon || "link"}</Icon>
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {name}
                </MDTypography>
              </MDBox>
            ))}
          </>
        );
      }
      default: {
        return subDescription;
      }
    }
  };
  return (
    <MDBox key={index} display="flex" alignItems="center" py={1} mb={1} sx={sx}>
      <MDBox mr={2}>
        {typeof image === "string" ? (
          <MDAvatar
            src={image}
            alt="something here"
            shadow="md"
            data-testid="quick-info-image"
          />
        ) : (
          <MDAvatar
            bgColor={bg || "info"}
            alt="something here"
            shadow="md"
            data-testid="quick-info-image"
          >
            {image}
          </MDAvatar>
        )}
      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <MDTypography
          variant="button"
          fontWeight="medium"
          data-testid="quick-info-name"
        >
          {name}
        </MDTypography>
        {/* <MDTypography variant="caption" color="text">
          {typeof description !== 'string' ? description : description}
        </MDTypography> */}
        {formattedDescription()}
        {formattedSubDescription()}
      </MDBox>
      {(onClick || route) &&
        (onClick ? (
          <MDBox ml="auto">
            <MDButton
              display="inline"
              onClick={(e: any) => onClick(e)}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={color}
              disabled={isDisabled}
            >
              {label}
            </MDButton>
          </MDBox>
        ) : (
          <MDBox ml="auto">
            <MDButton
              display="inline"
              href={route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={color}
              disabled={isDisabled}
            >
              {label}
            </MDButton>
          </MDBox>
        ))}
      {link && linkLabel && (
        <MDBox ml="auto">
          <Link href={link}>
            <MDButton
              variant="text"
              color="info"
              disabled={isDisabled}
              onClick={(e: React.MouseEvent) => (onClick ? onClick(e) : undefined)}
            >
              {linkLabel}
            </MDButton>
          </Link>
        </MDBox>
      )}
    </MDBox>
  );
}
