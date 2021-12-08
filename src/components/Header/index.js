import React from "react";
import css from "./Header.module.css";

function Header(props) {
  return (
    <div className={css.header}>
      <h1>Планировщик задач</h1>
      <input
        type="text"
        placeholder="Поиск..."
        className={css.searchBar}
        onChange={({ target: { value } }) => props.search(value)}
      />
    </div>
  );
}

export default Header;

//Header(handleChange,searchTerm )
//<input  onChange={handleChange} value={searchTerm}/>
// onChange={(e) => setSearch(e.taget.value)}
