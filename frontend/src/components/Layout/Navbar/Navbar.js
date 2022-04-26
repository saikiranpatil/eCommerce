import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserOptions from "../../Layout/Navbar/UserOptions";
import "./Navbar.css";

export default function Navbar({ user, isAuthenticated }) {

  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const onSubmitSetKeyword = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };

  return (
    <>
      <nav id="nav" className="flex glass  full-width">
        <div className="logo flex">
          <Link to="/">
            <img className="logo-img" src="/icons/logo.svg" alt="" />
          </Link>
        </div>
        <div>
          <form className="search-bar">
            <input
              type="text"
              placeholder="Search for any products"
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value) }}
            />
            <button type="submit" value="Search" onClick={onSubmitSetKeyword}>Search</button>
          </form>
        </div>
        <UserOptions isAuthenticated={isAuthenticated} user={user} />
        <div id="burger">
          <div id="bar1" className="bar" />
          <div id="bar2" className="bar" />
          <div id="bar3" className="bar" />
        </div>
      </nav>
    </>
  );
}
