import React from "react";
import "../Header/Header.scss";

const SearchList = ({ keyWord, listItem }) => {
  return (
    <div className="">
      {/* <div className="">Tìm kiếm với từ khóa: "{keyWord}"</div> */}
      {/* <div className=""> */}
      <ul className="suggestions">
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
      {/* </div> */}
    </div>
  );
};

export default SearchList;
