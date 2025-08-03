'use client';
import { forwardRef, FC } from 'react';
import { BoxProps } from '@mui/material';
// Custom styles for MDBox
import MDBoxRoot from './MDBoxRoot';

// declaring props types for MDBox
interface Props extends BoxProps {
  variant?: 'contained' | 'gradient';
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?: string;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const MDBox: FC<Props> = forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'transparent',
      color = 'dark',
      opacity = 1,
      borderRadius = 'none',
      shadow = 'none',
      coloredShadow = 'none',
      ...rest
    },
    ref
  ) => (
    // @ts-ignore
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

export default MDBox;
