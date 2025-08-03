"use client";
import { SxProps, Theme } from "@mui/system";
import { keyframes } from "@emotion/react";
// import { styled, Theme } from '@mui/material/styles';

// import { Theme } from '../styles';
import colors from "../assets/theme/base/colors";
import linearGradient from "../assets/theme/functions/linearGradient";
import MDAvatar from "@/components/Elements/MDAvatar";

const { gradients } = colors;

interface Props {
  alt: string;
  shadow?: "none" | "xs" | "sm" | "lg" | "xl" | "xxl" | "md" | "inset";
  bgColor?:
    | "info"
    | "transparent"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  variant?: "rounded" | "circular" | "square";
  height?: string;
  width?: string;
  gradient?: string;
  color?: string;
  sx?: SxProps<Theme>;
  fadeAnimation?: string;
  fadeOpacity?: string;
  isAnimating?: boolean;
  padding?: string | number;
  opacity?: string | number;
}

const waevKeyframes = () => keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(100%);
}
`;

export const WaevAvatarIcon = ({
  alt,
  shadow,
  bgColor = "info",
  size = "xs",
  variant,
  width = "100%",
  height = "100%",
  gradient,
  color,
  sx,
  isAnimating,
  padding = "10px",
  opacity = "1",
}: Props): JSX.Element => {
  const mid = 50;
  const amp = 22;
  return (
    <MDAvatar
      alt={alt || "Waev Icon"}
      size={size}
      bgColor={bgColor}
      shadow={shadow}
      // variant={variant}
      // @ts-ignore
      sx={({ palette: { gradients } }: Theme) => ({
        position: "relative",
        padding: padding,
        opacity: opacity,
        "&::before, &::after": {
          content: '""',
          display: "inline - block",
          position: "absolute",
          top: 0,
          //opacity:'0.7',
        },
        // '&:hover::before': {
        //   transform: 'translateX(100%)',
        // },
        "&::before": {
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: linearGradient(
            gradients[bgColor]?.main,
            gradients[bgColor]?.state
          ),
          transition: "all 1s",
          animation: isAnimating
            ? `1.5s infinite ${waevKeyframes()}`
            : `1s ease-out ${waevKeyframes()}`,
          animationFillMode: "forwards",
        },
        ...sx,
      })}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <title>Layer 1</title>
          {gradient && (
            <defs>
              <linearGradient
                id="grad1"
                gradientUnits="userSpaceOnUse"
                x1="100"
                y1="55"
                x2="0"
                y2="2"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: gradients[gradient].main }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: gradients[gradient].state }}
                />
              </linearGradient>
            </defs>
          )}

          <polyline
            stroke={gradient ? "url(#grad1)" : color || "white"}
            strokeWidth="8"
            fill="none"
            // fill="url(#grad1)"
            strokeLinejoin="round"
            strokeLinecap="round"
            // 100,${mid}
            points={`

           8,54
           20,${mid - amp}
           30,${mid}
           40,${mid + amp}
           50,${mid}
           60,${mid - amp}
           70,${mid}
           80,${mid + amp}
           90,46



           `}
            //  900,${mid}
          />
        </g>
      </svg>
    </MDAvatar>
  );
};

export const WaevAvatar = ({
  alt,
  shadow,
  bgColor = "info",
  size = "xs",
  sx,
  isAnimating,
  fadeAnimation,
  fadeOpacity,
  padding,
  opacity = 1,
}: Props): JSX.Element => {
  return (
    <MDAvatar
      id="loader"
      sx={{
        position: "fixed",
        right: 5,
        bottom: 3,
        margin: "24px",
        zIndex: "1500",
        animation: fadeAnimation,
        opacity: fadeOpacity,
        ...sx,
      }}
    >
      <WaevAvatarIcon
        alt={alt}
        size={size}
        shadow={shadow}
        bgColor={bgColor}
        isAnimating={isAnimating}
        padding={padding}
        opacity={opacity}
      />
    </MDAvatar>
  );
};
