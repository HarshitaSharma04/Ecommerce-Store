import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function PublicLayout({ children }) {
  return (
    
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default PublicLayout;
