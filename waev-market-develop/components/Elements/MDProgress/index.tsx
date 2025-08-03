'use client';
import { FC, forwardRef } from 'react';
import MDTypography from '../MDTypography';

// Custom styles for MDProgress
import MDProgressRoot from './MDProgressRoot';

// Delcare props types for MDProgress
interface Props {
  variant?: 'contained' | 'gradient';
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  value: number;
  label?: boolean;
  [key: string]: any;
}

const MDProgress: FC<Props> = forwardRef(
  ({ variant = 'contained', color = 'info', value = 0, label = false, ...rest }, ref) => (
    <>
      {label && (
        <MDTypography variant="button" fontWeight="medium" color="text">
          {value}%
        </MDTypography>
      )}
      <MDProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        ownerState={{ color, value, variant }}
      />
    </>
  )
);

MDProgress.displayName = 'MDProgress';


export default MDProgress;
