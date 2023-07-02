import React, { useState } from "react";
import SearchList from "./SearchList";

const Search = () => {
  const [keyWord, setKeyWord] = useState("");
  const onChangeSearch = (e) => {
    setKeyWord(e.target.value);
  };
  return (
    <div>
      <input type="text" value={keyWord} onChange={onChangeSearch} />
      {keyWord.trim() !== "" && <SearchList keyWord={keyWord} listItem={[]} />}
    </div>
  );
};

export default Search;
