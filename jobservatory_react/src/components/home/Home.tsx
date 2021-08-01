import * as React from "react";
import { useHistory } from "react-router";
import { ColorModeSwitcher } from "./../../ColorModeSwitcher";
import "./../../styles/home.scss";
import { SearchBar } from "./../search-bar/SearchBar";
import { GoButton } from "./GoButton";

export const Home = () => {
  const history = useHistory();
  const goToDetail = () => {
    history.push("/detail/");
  };
  return (
    <div className="App">
      <div className="color-switcher">
        <ColorModeSwitcher />
      </div>
      <div className="container">
        <div className="search-welcome">Search your job or skill to check</div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="search-button">
          <GoButton onSearch={goToDetail} />
        </div>
      </div>
    </div>
  );
};
