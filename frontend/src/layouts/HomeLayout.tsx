/**
 * Main layout component for the application.
 * This component wraps the main content of the application and can be used to provide a consistent layout.
 */
import * as React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

import { useTheme } from "../hooks/useTheme";
import { Header } from "../components/Header";

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-black text-white"}`}
    >
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        {children}
      </main>
      <div id="portal-container" />
    </div>
  );
};

export default HomeLayout;
