import Navbar from "@/components/Navbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * A layout component that wraps the main parts of the application
 * (e.g., homepage, dashboard). It includes the main navigation bar.
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;