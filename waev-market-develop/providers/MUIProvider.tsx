"use client";
import { MaterialUIControllerProvider } from "@/contexts/styles";
import { ThemeProvider } from "@emotion/react";
import theme from "@/assets/theme";

export function MUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <MaterialUIControllerProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MaterialUIControllerProvider>
  );
}
