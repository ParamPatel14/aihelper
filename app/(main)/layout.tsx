
import Navbar from "@/components/Navbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}


const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;