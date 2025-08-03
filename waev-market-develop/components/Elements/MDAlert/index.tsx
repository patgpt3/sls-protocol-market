"use client";
import { useState, ReactNode } from 'react';
import Fade from '@mui/material/Fade';
import MDBox from '../MDBox';

// Custom styles for the MDAlert
import MDAlertRoot from './MDAlertRoot';
import MDAlertCloseIcon from './MDAlertCloseIcon';

// Declaring props types for MDAlert
interface Props {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  dismissible?: boolean;
  children: ReactNode;
  [key: string]: any;
}

function MDAlert({
  color = 'info',
  dismissible = false,
  children,
  ...rest
}: Props): JSX.Element | null {
  const [alertStatus, setAlertStatus] = useState('mount');

  const handleAlertStatus = () => setAlertStatus('fadeOut');

  // The base template for the alert
  const alertTemplate: any = (mount: boolean = true) => (
    <Fade in={mount} timeout={300}>
      {/* @ts-ignore */}
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display="flex" alignItems="center" color="white">
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? handleAlertStatus : undefined}>
            &times;
          </MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === 'mount':
      return alertTemplate();
    case alertStatus === 'fadeOut':
      setTimeout(() => setAlertStatus('unmount'), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

export default MDAlert;
