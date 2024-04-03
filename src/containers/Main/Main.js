import React from "react";
import { useSelector } from "../../store";

function Main({ children }) {
  const { isSports, isTable } = useSelector((state) => state.menu);
  return (
    <main className="h-full overflow-y-auto">
      <div className={`${!isSports && 'container'} ${!isTable && 'grid'} px-2 md:px-6 mx-auto`}>{children}</div>
    </main>
  );
}

export default Main;
