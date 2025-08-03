import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ReduxProvider, WagmiProvider, QueryProvider } from "@/providers";
import { MUIProvider } from "@/providers/MUIProvider";
import { Alerts } from "@/components/Modals/Alerts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beacon Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <MUIProvider>
            <QueryProvider>
              <WagmiProvider>
                <Header />
                <Alerts />
                {children}
              </WagmiProvider>
            </QueryProvider>
          </MUIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
