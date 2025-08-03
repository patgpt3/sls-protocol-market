import { Icon, Tooltip } from "@mui/material";

import MDTypography from "../Elements/MDTypography";
import MDBox from "../Elements/MDBox";
import MDButton from "../Elements/MDButton";
import MDInput from "../Elements/MDInput";

interface InputWithActionProps {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: Function;
  onPrimaryClick?: () => void;
  primaryIcon?: string;
  primaryTooltip?: string;
  onSecondaryClick?: () => void;
  secondaryIcon?: string;
  secondaryTooltip?: string;
  disablePrimaryWhenEmpty?: boolean;
  sx?: any;
  buttonsOnLeft?: boolean;
  [key: string]: any;
}

export function InputWithAction({
  value,
  label,
  placeholder,
  onChange,
  onPrimaryClick,
  primaryIcon,
  onSecondaryClick,
  secondaryIcon,
  disablePrimaryWhenEmpty,
  sx,
  primaryTooltip,
  secondaryTooltip,
  buttonsOnLeft,
}: InputWithActionProps): JSX.Element {
  return (
    <MDTypography
      sx={sx}
      display="flex"
      variant="button"
      fontWeight="light"
      color="text"
    >
      <MDBox display="flex" flexDirection={"row"} sx={{ width: "100%" }}>
        {!buttonsOnLeft && (
          <MDInput
            label={label}
            value={value}
            placeholder={placeholder}
            rows="4"
            onChange={(e: InputEvent) => onChange(e.target)}
            fullWidth
            // sx={{ width:'100%'}}
          />
        )}

        {onPrimaryClick && (
          <MDButton
            disabled={disablePrimaryWhenEmpty && !value}
            color="info"
            size="medium"
            iconOnly
            onClick={onPrimaryClick}
            sx={{ ml: 1, height: "100%", width: "55px" }}
          >
            {primaryTooltip ? (
              <Tooltip title={primaryTooltip} placement="top">
                <Icon
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {primaryIcon || "check"}
                </Icon>
              </Tooltip>
            ) : (
              <Icon
                sx={{
                  fontWeight: "bold",
                }}
              >
                {primaryIcon || "check"}
              </Icon>
            )}
          </MDButton>
        )}
        {onSecondaryClick && (
          <MDButton
            color="secondary"
            size="medium"
            iconOnly
            onClick={onSecondaryClick}
            sx={{ ml: 1, height: "100%", width: "55px" }}
          >
            {secondaryTooltip ? (
              <Tooltip title={secondaryTooltip} placement="top">
                <Icon
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {secondaryIcon || "cancel"}
                </Icon>
              </Tooltip>
            ) : (
              <Icon
                sx={{
                  fontWeight: "bold",
                }}
              >
                {secondaryIcon || "cancel"}
              </Icon>
            )}
          </MDButton>
        )}
        {buttonsOnLeft && (
          <MDInput
            label={label}
            value={value}
            placeholder={placeholder}
            rows="4"
            onChange={(e: InputEvent) => onChange(e.target)}
            fullWidth
            sx={{ ml: 1 }}
          />
        )}
      </MDBox>
    </MDTypography>
  );
}
