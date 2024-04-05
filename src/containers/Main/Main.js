import React from "react";
import { useSelector } from "../../store";
import Header from "../Header/Header";

function Main({ children }) {
  const { isSports, isTable } = useSelector((state) => state.menu);
  return (
    <main className="h-full overflow-y-auto relative">
      <Header />
      <div>{children}</div>
    </main>
  );
}

export default Main;
