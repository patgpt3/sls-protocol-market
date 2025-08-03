"use client";
import { FC, forwardRef } from 'react';
import { AvatarProps } from '@mui/material';
// Custom styles for MDAvatar
import MDAvatarRoot from './MDAvatarRoot';

// declare props types for MDAvatar
interface Props extends AvatarProps {
  bgColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'inset';
  [key: string]: any;
}

const MDAvatar = forwardRef<HTMLDivElement, Props>(
  ({ bgColor = 'transparent', size = 'md', shadow = 'none', ...rest }, ref) => (
    <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

MDAvatar.displayName = 'MDAvatar';

export default MDAvatar;
