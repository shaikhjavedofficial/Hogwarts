import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface BreakpointProps {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

const withBreakpoint = <P extends object>(Component: React.ComponentType<P & BreakpointProps>) => {
  return (props: P) => {
    const theme: Theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    const sm = useMediaQuery(theme.breakpoints.only('sm'));
    const md = useMediaQuery(theme.breakpoints.only('md'));
    const lg = useMediaQuery(theme.breakpoints.only('lg'));
    const xl = useMediaQuery(theme.breakpoints.only('xl'));

    const breakpointProps: BreakpointProps = {
      xs,
      sm,
      md,
      lg,
      xl,
    };

    return <Component {...props} {...breakpointProps} />;
  };
};

export default withBreakpoint;
