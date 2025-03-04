import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "products", text: "products" },
  { id: 2, url: "orders", text: "orders" },
  { id: 3, url: "checkout", text: "checkout" },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);
  const filteredLinks = links.filter(
    (link) => !(["orders", "checkout"].includes(link.url) && !user)
  );

  return (
    <>
      {filteredLinks.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
