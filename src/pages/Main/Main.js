import React from "react";
import { useSelector } from "../../store";
import Header from "../Header/Header";

function Main({ children }) {
  const { isSports, isTable } = useSelector((state) => state.menu);
  return (
    <div className="h-full relative">
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Main;
