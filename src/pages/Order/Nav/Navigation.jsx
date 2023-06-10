import React, { useState } from "react";
import "../Nav/Navigation.scss";

const Navigation = ({ onClickNav }) => {
  const [status, setStatus] = useState(1);
  return (
    <div>
      <ul className="nav-container">
        <li style={{ width: "15%" }}>
          <a
            onClick={() => {
              onClickNav(1);
              setStatus(1);
            }}
            className={status === 1 ? "active" : undefined}
          >
            Tất cả
          </a>
        </li>
        <li style={{ width: "20%" }}>
          <a
            onClick={() => {
              onClickNav(2);
              setStatus(2);
            }}
            className={status === 2 ? "active" : undefined}
          >
            Chờ xác nhận
          </a>
        </li>
        <li style={{ width: "30%" }}>
          <a
            onClick={() => {
              onClickNav(3);
              setStatus(3);
            }}
            className={status === 3 ? "active" : undefined}
          >
            Đang chuẩn bị hàng
          </a>
        </li>
        <li style={{ width: "20%" }}>
          <a
            onClick={() => {
              onClickNav(4);
              setStatus(4);
            }}
            className={status === 4 ? "active" : undefined}
          >
            Hoàn thành
          </a>
        </li>
        <li style={{ width: "15%" }}>
          <a
            onClick={() => {
              onClickNav(5);
              setStatus(5);
            }}
            className={status === 5 ? "active" : undefined}
          >
            Đã hủy
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
