"use client";
import {
  ReactNode,
  FC,
  forwardRef,
  createContext,
  useContext,
  useMemo,
} from "react";
import MDBox from "../MDBox";

// Custom styles for MDPagination
import MDPaginationItemRoot from "./MDPaginationItemRoot";

// The Pagination main context
const Context = createContext<any>(null);

// Declare props types for MDPagination
interface Props {
  item?: boolean;
  variant?: "gradient" | "contained";
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "small" | "medium" | "large";
  active?: boolean;
  children: ReactNode;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const MDPagination: FC<Props | any> = forwardRef(
  (
    {
      item = false,
      variant = 'gradient',
      color = 'info',
      size = 'medium',
      active = false,
      children,
      ...rest
    },
    ref
  ) => {
    const context: any = useContext(Context);
    const paginationSize = context ? context.size : undefined;

    const providerValue = useMemo(
      () => ({
        variant,
        color,
        size,
      }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={providerValue}>
        {item ? (
          <MDPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </MDPaginationItemRoot>
        ) : (
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </MDBox>
        )}
      </Context.Provider>
    );
  }
);


export default MDPagination;
