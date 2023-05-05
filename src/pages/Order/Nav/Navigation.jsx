import React from "react";
import "../Nav/Navigation.scss";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul className="nav-container">
        <li>
          <NavLink to="/all-order/all">Tất cả</NavLink>
        </li>
        <li>
          <NavLink to="/all-order/delivering">Đang giao</NavLink>
        </li>
        <li>
          <NavLink to="/all-order/complete">Hoàn thành</NavLink>
        </li>
        <li>
          <NavLink to="/all-order/cancel">Đã hủy</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
