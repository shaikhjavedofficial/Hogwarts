import { useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { BreakpointProps } from "../Utils/withBreakpoint/withBreakpoint";

export function useBreakpoint(): BreakpointProps {
  const theme: Theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const isMobile = xs || sm;
  const isTablet = md;
  const isDesktop = lg || xl;
  return { xs, sm, md, lg, xl, isMobile, isTablet, isDesktop };
}
