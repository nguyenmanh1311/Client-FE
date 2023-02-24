import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";

import { BsListTask, BsPersonFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { FaAddressBook } from "react-icons/fa";

import { Link } from "react-router-dom";
import { UserService } from "../../services/user.service";

const SidebarCustomer = () => {
  const [user, setUser] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchUser = () => {
      UserService.getUserByUserID(userId).then((res) => {
        setUser(res.data);
      });
    };
    fetchUser();
  }, [userId]);
  return (
    <div className="sidebar-customer col-lg-3 mt-2">
      <div
        className="rounded-circle d-flex justify-content-center"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src={"http://localhost:8080/api/v1/image_product/" + user.photo}
          className="rounded-circle "
          style={{ height: "250px" }}
          alt="Ảnh đại diện"
        />
      </div>
      <div className="name">{user.fullName}</div>

      <ul className="nav nav-pills ">
        <Link to={`/all-order`} className="nav-link d-flex align-items-center">
          <BsListTask className="order fa fa-list mr-2"></BsListTask>
          Tất cả đơn hàng
        </Link>

        <Link to={`/account`} className="nav-link d-flex align-items-center">
          <BsPersonFill className="account fa fa-user mr-2"></BsPersonFill> Tài
          khoản của bạn
        </Link>

        <Link
          to={`/account/address`}
          className="nav-link d-flex align-items-center"
        >
          <FaAddressBook className="address fa fa-user mr-2"></FaAddressBook>{" "}
          Danh sách địa chỉ
        </Link>
      </ul>
    </div>
  );
};

export default SidebarCustomer;
