import React from "react";
import { useWordsStore } from "../store/useWords";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Toaster } from "sonner";
import "../index.css";

const Layout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Header />
        {children}
        <Footer />
      </Wrapper>

      <Toaster richColors position="top-right" />
    </>
  );
};

const Wrapper = ({ children }) => {
  const { setFocusedFalse } = useWordsStore();

  const handleSetFocusedFalse = (e) => {
    e.stopPropagation();
    setFocusedFalse();
  };

  return (
    <div
      id="wide-div"
      className="w-full bg-primary "
      onClick={(e) => handleSetFocusedFalse(e)}
    >
      {children}
    </div>
  );
};

export default Layout;
