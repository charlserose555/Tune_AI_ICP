import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { DropdownIcon } from "../../icons";
import * as Icons from "../../icons";
import { Transition } from "@windmill/react-ui";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <NavLink
      to={route.path}
      activeClassName="text-gray-800 dark:text-yellow-300"
    >
      <li className="relative px-6 py-3" key={route.name}>
        <button
          className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-yellow-800 dark:hover:text-yellow-200"
          onClick={handleDropdownMenuClick}
          aria-haspopup="true"
        >
          <Route path={route.path} exact={route.exact}>
            <span
              className="absolute inset-y-0 left-0 w-1 bg-yellow-300 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
          </Route>
          <span className="inline-flex items-center">
            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
            <span className="ml-4">{route.name}</span>
          </span>
          <DropdownIcon className="w-4 h-4" aria-hidden="true" />
        </button>
        <Transition
          show={isDropdownMenuOpen}
          enter="transition-all ease-in-out duration-100"
          enterFrom="opacity-25 max-h-0"
          enterTo="opacity-100 max-h-xl"
          leave="transition-all ease-in-out duration-100"
          leaveFrom="opacity-100 max-h-xl"
          leaveTo="opacity-0 max-h-0"
        >
          <ul
            className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-bcb_sidebar dark:text-gray-400"
            aria-label="submenu"
          >
            {route.routes.map((r) => (
              <NavLink
                activeClassName="text-gray-800 dark:text-yellow-300"
                exact
                className="w-full"
                to={r.path}
                key={r.path}
              >
                <li
                  className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  key={r.name}
                >
                  {r.name}
                </li>
              </NavLink>
            ))}
          </ul>
        </Transition>
      </li>
    </NavLink>
  );
}

export default SidebarSubmenu;
